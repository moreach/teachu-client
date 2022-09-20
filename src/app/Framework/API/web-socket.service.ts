import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, filter } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { WebSocketConnectionDTO } from 'src/app/DTOs/User/WebSocketConnectionDTO';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private connection: signalR.HubConnection | undefined;

  constructor(
    private apiService: ApiService,
  ) { }

  private setupConnection() {
    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.URL_WEB_SOCKET}${endpoints.WebSocket}`)
        .build();
      this.connection.start().then(() => {
        this.connection!.invoke('getConnectionId')
          .then((connectionId: string) => {
            this.apiService.callApi(endpoints.WebSocketConnections, {
              connectionId,
          } as WebSocketConnectionDTO, 'POST').subscribe();
        });
      })
    }
    return this.connection;
  }

  webSocketData<T>(event: string, startValue: T, identifier?: string) {
    const eventName = !!identifier ? `${event}|${identifier}` : event;
    const socketData = new BehaviorSubject<T>(startValue);
    this.setupConnection().on(eventName, (data: any) => {
      socketData.next(data as T);
    });
    return socketData.asObservable().pipe(
      filter(data => data !== startValue && !!data),
    );
  }
}
