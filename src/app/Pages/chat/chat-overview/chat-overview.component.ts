import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatOverviewDTO } from 'src/app/DTOs/ChatOverviewDTO';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
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
    this.chatOverviews$ = this.chatService.getChatOverview$();
  }

  openDetail(chatId: string) {
    // todo
  }

  isToday(date: Date) {
    return isToday(date);
  }
}
