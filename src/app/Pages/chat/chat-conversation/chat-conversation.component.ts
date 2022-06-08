import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { ChatConversationDTO } from 'src/app/DTOs/ChatConversationDTO';
import { ChatParticipantDTO } from 'src/app/DTOs/ChatParticipantDTO';
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

  constructor(
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.conversation$ = this.chatService.getChatConversation$(this.chatId);
  }

  ngOnInit(): void {
    this.chatId = this.activatedRoute.snapshot.paramMap.get(appRoutes.ChatId) ?? '';
  }

  openSettings() {
    this.router.navigate([`${appRoutes.App}/${appRoutes.Chat}/${this.chatId}/${appRoutes.ConversationInfo}`]);
  }

  formatParticipants(participants: ChatParticipantDTO[]): string {
    const concatenated = participants.map(p => p.name).filter(p => !!p).join(', ');
    return truncateToMaxChars(concatenated, 100);
  }
}
