import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { ChatResponseDTO } from 'src/app/DTOs/Chat/ChatResponseDTO';
import { UserExternalUserDTO } from 'src/app/DTOs/User/UserExternalUserDTO';
import { TokenService } from 'src/app/Framework/API/token.service';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
import { truncateToMaxChars } from 'src/app/Framework/Helpers/StringHelpers';
import { ChatService } from '../chat.service';
import { GroupChatDialogComponent } from '../group-chat-dialog/group-chat-dialog.component';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss']
})
export class ChatOverviewComponent {

  chatOverviews$: Observable<ChatResponseDTO[]>;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private dialog: MatDialog,
    private tokenService: TokenService,
  ) {
    this.chatOverviews$ = this.chatService.getChatOverview$().pipe(
      map(chatOverviews => chatOverviews.map(c => {
        return {
          ...c,
          lastMessage: {
            ...c.lastMessage,
            message: truncateToMaxChars(c.lastMessage.message, 100)
          }
        } 
      }))
    );
  }

  openDetail(chatId: string) {
    this.router.navigate([`${appRoutes.App}/${appRoutes.Chat}/${chatId}`]);
  }

  isToday(date: number) {
    return isToday(this.getDateFromEpoch(date));
  }

  openNewGroupChatDialog() {
    this.dialog.open(GroupChatDialogComponent, { });
  }

  _filter(value: string | null, users: UserOption[]) {
    const filterValue = (typeof value === 'string' ? value : '').toLowerCase();
    return users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  isGroupChat(chat: ChatResponseDTO) {
    return chat.members.length > 2;
  }

  getDateFromEpoch(date: number) {
    var epoch = new Date(0);
    epoch.setMilliseconds(date);
    return epoch;
  }

  isOwn(userId: string) {
    return userId === this.tokenService.getUserId();
  }

  getProfileImage(users: UserExternalUserDTO[]) {
    return users.filter(u => u.id !== this.tokenService.getUserId())[0].imageId;
  }
}

interface UserOption {
  id: string;
  name: string;
  userExists: boolean;
}