import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { GroupMessageChatDTO } from 'src/app/DTOs/Group/GroupMessageChatDTO';
import { GroupMessageSendDTO } from 'src/app/DTOs/Group/GroupMessageSendDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';
import { WebSocketService } from 'src/app/Framework/API/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class GroupChatService {

  constructor(
    private api: ApiExtensionService,
    private ws: WebSocketService,
  ) { }

  getMessages(groupId: string): Observable<GroupMessageChatDTO> {
    return merge(
      this.api.callApi<GroupMessageChatDTO>(endpoints.GroupMessages, { groupId }, 'GET'),
      this.ws.webSocketData<GroupMessageChatDTO>(endpoints.GroupMessages, {} as GroupMessageChatDTO, groupId),
    );
  }

  sendMessage(message: GroupMessageSendDTO) {
    return this.api.callApi(endpoints.GroupMessages, message, 'POST');
  }

  translateInfoMessage(message: string): KeyValue<string, string> {
    let part = message.split('|');
    if (part.length < 2) {
      part = [...part, ''];
    }
    return {
      key: 'group.' + part[0],
      value: part[1]
    };
  }
}
