import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { ChatConversationDTO } from 'src/app/DTOs/xx_old/ChatConversationDTO';
import { ChatParticipantDTO } from 'src/app/DTOs/xx_old/ChatParticipantDTO';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
import { truncateToMaxChars } from 'src/app/Framework/Helpers/StringHelpers';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnInit {

  chatId: string = '';
  conversation$: Observable<ChatConversationDTO>;
  newMessageControl = new FormControl('', Validators.required);

  constructor(
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.chatId = this.activatedRoute.snapshot.paramMap.get(appRoutes.ChatId) ?? '';
    this.conversation$ = this.chatService.getChatConversation$(this.chatId).pipe(
      map(c => {
        return {
          info: c.info,
          messages: c.messages.reverse(), // column reverse is used to keep the scroll at the bottom
        }
      }),
    );
  }

  ngOnInit(): void {
    
  }

  openSettings(conversation: ChatConversationDTO) {
    if (conversation.info.chatType === 'GROUP') {
      this.router.navigate([`${appRoutes.App}/${appRoutes.Chat}/${this.chatId}/${appRoutes.ConversationInfo}`]);
    }
  }

  formatParticipants(participants: ChatParticipantDTO[]): string {
    const concatenated = participants.map(p => p.name).filter(p => !!p).join(', ');
    return truncateToMaxChars(concatenated, 100);
  }

  isToday(date: Date) {
    return isToday(date);
  }

  sendMessage() {
    this.chatService.sendMessage$(this.chatId, this.newMessageControl.value).subscribe(_ => {
      this.newMessageControl = new FormControl('', Validators.required);
    });
  }
}
