import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { ChatResponseDTO } from 'src/app/DTOs/Chat/ChatResponseDTO';
import { ChatSaveGroupDTO } from 'src/app/DTOs/Chat/ChatSaveGroupDTO';
import { UserExternalUserDTO } from 'src/app/DTOs/User/UserExternalUserDTO';
import { TokenService } from 'src/app/Framework/API/token.service';
import { ChatService } from '../chat.service';
import { GroupChatDialogComponent } from '../group-chat-dialog/group-chat-dialog.component';

@Component({
  selector: 'app-chat-conversation-info',
  templateUrl: './chat-conversation-info.component.html',
  styleUrls: ['./chat-conversation-info.component.scss']
})
export class ChatConversationInfoComponent {

  chatId: string = '';
  info$: Observable<ChatResponseDTO>;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenService: TokenService,
  ) {
    this.chatId = this.activatedRoute.snapshot.paramMap.get(appRoutes.ChatId) ?? '';
    this.info$ = this.chatService.getChatConversationInfo$(this.chatId);
  }

  editChat(info: ChatResponseDTO) {
    this.dialog.open(GroupChatDialogComponent, {
      data: {
        chatId: this.chatId,
        chatName: info.title,
        chatImage: this.getProfileImage(info.members),
        usersId: info.members.map(p => p.id),
      } as ChatSaveGroupDTO
    })
  }

  getProfileImage(members: UserExternalUserDTO[]) {
    if (members.length === 2) {
      return members.find(p => p.id !== this.tokenService.getUserId())?.imageId;
    }
    return undefined;
  }

  isOwn(userId: string) {
    return this.tokenService.getUserId() === userId;
  }

  isAdmin(creatorId: string) {
    return this.isOwn(creatorId);
  }
}
