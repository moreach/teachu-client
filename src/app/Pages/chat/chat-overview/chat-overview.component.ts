import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {map, Observable} from 'rxjs';
import {appRoutes} from 'src/app/Config/appRoutes';
import {ChatResponseDTO} from 'src/app/DTOs/Chat/ChatResponseDTO';
import {TokenService} from 'src/app/Framework/API/token.service';
import {isToday} from 'src/app/Framework/Helpers/DateHelpers';
import {truncateToMaxChars} from 'src/app/Framework/Helpers/StringHelpers';
import {ChatService} from '../chat.service';
import {GroupChatDialogComponent} from '../group-chat-dialog/group-chat-dialog.component';

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
    const timeStampEpoch = Math.floor(Date.now());
    this.chatOverviews$ = this.chatService.getChatOverview$().pipe(
      map(chatOverviews => chatOverviews.map(c => {
        return {
          ...c,
          lastMessage: {
            ...c.lastMessage,
            message: truncateToMaxChars(c.lastMessage.message ?? '', 100)
          }
        }
      })),
      map(chats => chats.sort((a, b) => (!!b.lastMessage ? b.lastMessage.timestamp : timeStampEpoch) - (!!a.lastMessage ? a.lastMessage.timestamp : timeStampEpoch))),
    );
  }

  openDetail(chatId: string) {
    this.router.navigate([`${appRoutes.App}/${appRoutes.Chat}/${chatId}`]);
  }

  isToday(date: number) {
    return isToday(this.getDateFromEpoch(date));
  }

  openNewGroupChatDialog() {
    const dialog$ = this.dialog.open(GroupChatDialogComponent, { });
    dialog$.afterClosed().subscribe(_ => this.chatOverviews$ = this.chatService.getChatOverview$());
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
    if (!date) {
      epoch = new Date();
    } else {
      epoch.setMilliseconds(date);
    }
    return epoch;
  }

  isOwn(userId: string) {
    return userId === this.tokenService.getUserId();
  }

  isSoloChat(chat: ChatResponseDTO): boolean {
    return chat.members.length === 2; // 2 because the current user is also in there
  }

  getProfileImage(chat: ChatResponseDTO) {
    return chat.members[0].imageId;
  }

  isEmpty(array: any[]) {
    return array.length === 0;
  }
}

interface UserOption {
  id: string;
  name: string;
  userExists: boolean;
}
