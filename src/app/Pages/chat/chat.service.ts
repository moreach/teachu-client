import { Injectable } from '@angular/core';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { ChatConversationDTO } from 'src/app/DTOs/Chat/ChatConversationDTO';
import { ChatMessageRequestDTO } from 'src/app/DTOs/Chat/ChatMessageRequestDTO';
import { ChatMessageResponseDTO } from 'src/app/DTOs/Chat/ChatMessageResponseDTO';
import { ChatRequestDTO } from 'src/app/DTOs/Chat/ChatRequestDTO';
import { ChatResponseDTO } from 'src/app/DTOs/Chat/ChatResponseDTO';
import { ChatUserDTO } from 'src/app/DTOs/Chat/ChatUserDTO';
import { UserExternalUserDTO } from 'src/app/DTOs/User/UserExternalUserDTO';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // TODO EW: bind reload in more elegant way

  constructor(
    private api: ApiService,
  ) { }

  getChatOverview$(): Observable<ChatResponseDTO[]> {
    return this.api.callApi<ChatResponseDTO[]>(endpoints.Chat, { }, 'GET');
  }

  getChatConversation$(chatId: string): Observable<ChatConversationDTO> {
    return combineLatest(
      this.api.callApi<ChatMessageResponseDTO[]>(endpoints.Chat + '/' + endpoints.Messages + '/' + chatId, { }, 'GET'),
      this.api.callApi<ChatResponseDTO[]>(endpoints.Chat, { }, 'GET')
    ).pipe(
      map(([messages, chats]) => {
        return {
          info: chats.find(chat => chat.id === chatId),
          messages: messages.reverse(),
        } as ChatConversationDTO;
      }),
    );
  }

  getChatConversationInfo$(chatId: string): Observable<ChatResponseDTO> {
    return this.api.callApi<ChatResponseDTO[]>(endpoints.Chat, { }, 'GET').pipe(
      map(chats => chats.find(chat => chat.id === chatId)),
      filter(chat => !!chat),
      map(chat => chat as ChatResponseDTO),
    );
  }

  getChatUser$(query: string): Observable<ChatUserDTO[]> {
    return this.api.callApi<UserExternalUserDTO[]>(endpoints.Search + '/' + endpoints.User, { query }, 'GETwithPARAMS').pipe(
      map(users => users.map(user => {
        return {
          id: (user as any).user.id,
          name: (user as any).user.firstName + ' ' + (user as any).user.lastName,
        }
      })),
    )
  }

  createChatGroup$(value: ChatRequestDTO) {
    return this.api.callApi(endpoints.Chat, value, 'POST');
  }

  sendMessage$(chatId: string, message: string) {
    const value = {
      chatId,
      message,
    } as ChatMessageRequestDTO;
    return this.api.callApi(endpoints.Chat + '/' + endpoints.Messages, value, 'POST');
  }
}
