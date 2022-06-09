import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { ChatConversationInfoDTO } from 'src/app/DTOs/ChatConversationInfoDTO';
import { ChatSaveGroupDTO } from 'src/app/DTOs/ChatSaveGroupDTO';
import { ChatService } from '../chat.service';
import { GroupChatDialogComponent } from '../group-chat-dialog/group-chat-dialog.component';

@Component({
  selector: 'app-chat-conversation-info',
  templateUrl: './chat-conversation-info.component.html',
  styleUrls: ['./chat-conversation-info.component.scss']
})
export class ChatConversationInfoComponent {

  chatId: string = '';
  info$: Observable<ChatConversationInfoDTO>;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.chatId = this.activatedRoute.snapshot.paramMap.get(appRoutes.ChatId) ?? '';
    this.info$ = this.chatService.getChatConversationInfo$(this.chatId);
    this.info$.subscribe(info => {
      if (info.chatType === 'PRIVATE') {
        this.router.navigate([`${appRoutes.App}/${appRoutes.Chat}/${this.chatId}`]);
      }
    });
  }

  leaveChat() {
    this.chatService.leaveChat$(this.chatId).subscribe(_ => {
      this.router.navigate([`${appRoutes.App}/${appRoutes.Chat}`]);
    });
  }

  editChat(info: ChatConversationInfoDTO) {
    this.dialog.open(GroupChatDialogComponent, {
      data: {
        chatId: this.chatId,
        chatName: info.chatName,
        chatImage: info.chatImage,
        usersId: info.participants.map(p => p.userId),
      } as ChatSaveGroupDTO
    })
  }
}
