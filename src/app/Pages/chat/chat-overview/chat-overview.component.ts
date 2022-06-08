import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChatOverviewDTO } from 'src/app/DTOs/ChatOverviewDTO';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
import { truncateToMaxChars } from 'src/app/Framework/Helpers/StringHelpers';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss']
})
export class ChatOverviewComponent {

  chatOverviews$: Observable<ChatOverviewDTO[]>;

  constructor(
    private chatService: ChatService,
  ) {
    this.chatOverviews$ = this.chatService.getChatOverview$().pipe(
      map(chatOverviews => chatOverviews.map(c => {
        return {
          ...c,
          lastMessage: truncateToMaxChars(c.lastMessage, 100),
        } 
      }))
    );
  }

  openDetail(chatId: string) {
    // todo
  }

  isToday(date: Date) {
    return isToday(date);
  }
}
