import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatOverviewDTO } from 'src/app/DTOs/ChatOverviewDTO';
import { addMinutes } from 'src/app/Framework/Helpers/DateHelpers';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  getChatOverview$(): Observable<ChatOverviewDTO[]> {
    // todo implement from backend endpoint
    const mockData = [
      {
        chatId: '1',
        chatName: 'Chat 1',
        chatType: 'GROUP',
        chatImage: 'https://www.w3schools.com/howto/img_avatar.png',
        lastMessage: 'Last message Chat 1',
        lastMessageFrom: 'Oliver Umbricht',
        lastMessageDate: addMinutes(new Date(), -10)
      } as ChatOverviewDTO,
      {
        chatId: '2',
        chatName: 'Chat 2',
        chatType: 'GROUP',
        chatImage: 'https://www.w3schools.com/howto/img_avatar.png',
        lastMessage: 'Last message Chat 2',
        lastMessageFrom: null,
        lastMessageDate: addMinutes(new Date(), -20)
      } as ChatOverviewDTO,
      {
        chatId: '3',
        chatName: 'Micha Schweizer',
        chatType: 'PRIVATE',
        chatImage: 'https://www.w3schools.com/howto/img_avatar.png',
        lastMessage: 'Last message Chat Micha',
        lastMessageFrom: 'Micha Schweizer',
        lastMessageDate: addMinutes(new Date(), -2000)
      } as ChatOverviewDTO,
      {
        chatId: '4',
        chatName: 'Jonas Hauser',
        chatType: 'PRIVATE',
        chatImage: 'https://www.w3schools.com/howto/img_avatar.png',
        lastMessage: 'Last message Chat Jonas',
        lastMessageFrom: null,
        lastMessageDate: addMinutes(new Date(), -5000)
      } as ChatOverviewDTO,
    ];
    return of(mockData);
  }

  getChatMessages$() {
    
  }

  getChatSettings$ () {

  }
}
