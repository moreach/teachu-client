import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, startWith, tap } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { ChatOverviewDTO } from 'src/app/DTOs/xx_old/ChatOverviewDTO';
import { ChatUserDTO } from 'src/app/DTOs/xx_old/ChatUserDTO';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
import { truncateToMaxChars } from 'src/app/Framework/Helpers/StringHelpers';
import { ChatService } from '../chat.service';
import { GroupChatDialogComponent } from '../group-chat-dialog/group-chat-dialog.component';
import { PrivateChatDialogComponent } from '../private-chat-dialog/private-chat-dialog.component';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss']
})
export class ChatOverviewComponent {

  chatOverviews$: Observable<ChatOverviewDTO[]>;
  searchBarControl = new FormControl('');
  searchBarUsers$: Observable<UserOption[]>;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.chatOverviews$ = this.chatService.getChatOverview$().pipe(
      map(chatOverviews => chatOverviews.map(c => {
        return {
          ...c,
          lastMessage: truncateToMaxChars(c.lastMessage, 100),
        } 
      }))
    );

    this.searchBarUsers$ = combineLatest([
      this.chatService.getChatUser$(),
      this.chatOverviews$.pipe(
        map(co => co.map(c => {
          return {
            id: c.chatId,
            name: c.chatName,
          } as ChatUserDTO
        }))
      ),
      this.searchBarControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([users, chats, value]) => [users.filter(u => !chats.some(c => c.id === u.id)), chats, value]),
      map(([users, chats, value]) => [
          (users as ChatUserDTO[]).map(u => {
            return {
              ...u,
              userExists: false,
            } as UserOption
          }),
          (chats as ChatUserDTO[]).map(c => {
            return {
              ...c,
              userExists: true,
            } as UserOption
          }),
          value
        ]
      ),
      map(([users, chats, value]) => [[...users, ...chats], value]),
      map(([users, value]) => this._filter(value, users)),
      map(users => users.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))),
    );
  }

  openDetail(chatId: string) {
    this.router.navigate([`${appRoutes.App}/${appRoutes.Chat}/${chatId}`]);
  }

  isToday(date: Date) {
    return isToday(date);
  }

  openNewPrivateChatDialog(userId?: string) {
    this.dialog.open(PrivateChatDialogComponent, { 
      data: {
        userId
      }
    });
  }

  openNewGroupChatDialog() {
    this.dialog.open(GroupChatDialogComponent, { });
  }

  _filter(value: string | null, users: UserOption[]) {
    const filterValue = (typeof value === 'string' ? value : '').toLowerCase();
    return users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  selectUser(user: UserOption) {
    if (user.userExists) {
      this.openDetail(user.id);
    } else {
      this.openNewPrivateChatDialog(user.id);
    }
    this.searchBarControl.setValue('');
  }
}

interface UserOption {
  id: string;
  name: string;
  userExists: boolean;
}