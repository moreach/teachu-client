import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { ChatConversationDTO } from 'src/app/DTOs/Chat/ChatConversationDTO';
import { ChatResponseDTO } from 'src/app/DTOs/Chat/ChatResponseDTO';
import { UserExternalUserDTO } from 'src/app/DTOs/User/UserExternalUserDTO';
import { TokenService } from 'src/app/Framework/API/token.service';
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
    private tokenService: TokenService,
  ) {
    this.chatId = this.activatedRoute.snapshot.paramMap.get(appRoutes.ChatId) ?? '';
    this.conversation$ = this.chatService.getChatConversation$(this.chatId).pipe(
      map(c => {
        return {
          info: c.info,
          messages: c.messages,
        }
      }),
    );
  }

  ngOnInit(): void {

  }

  openSettings() {
    this.router.navigate([`${appRoutes.App}/${appRoutes.Chat}/${this.chatId}/${appRoutes.ConversationInfo}`]);
  }

  formatParticipants(participants: UserExternalUserDTO[]): string {
    const concatenated = participants.map(p => p.firstName + ' ' + p.lastName).filter(p => !!p).join(', ');
    return truncateToMaxChars(concatenated, 100);
  }

  isToday(date: number) {
    return isToday(this.getFromEpoch(date));
  }

  sendMessage() {
    this.chatService.sendMessage$(this.chatId, this.newMessageControl.value).subscribe(_ => {
      this.newMessageControl = new FormControl('', Validators.required);
      this.conversation$ = this.chatService.getChatConversation$(this.chatId);
    });
  }

  isGroupChat(chat: ChatResponseDTO) {
    return chat.members.length > 2;
  }

  isOwn(userId: string) {
    return this.tokenService.getUserId() === userId;
  }

  getFromEpoch(date: number) {
    var epoch = new Date(0);
    if (!date) {
      epoch = new Date();
    } else {
      epoch.setMilliseconds(date);
    }
    return epoch;
  }
}
