import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { TogetherAskAnswerDTO } from 'src/app/DTOs/Together/TogetherAskAnswerDTO';
import { TogetherAskOverviewDTO } from 'src/app/DTOs/Together/TogetherAskOverviewDTO';
import { TogetherAskUserDTO } from 'src/app/DTOs/Together/TogetherAskUserDTO';
import { TogetherUserProfileDTO } from 'src/app/DTOs/Together/TogetherUserProfileDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';
import { WebSocketService } from 'src/app/Framework/API/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class TogetherAskService {

  constructor(
    private api: ApiExtensionService,
    private ws: WebSocketService,
  ) { }

  getOpenAsks(): Observable<TogetherAskOverviewDTO> {
    return merge(
      this.api.callApi<TogetherAskOverviewDTO>(endpoints.TogetherAskUser, {}, 'GET'),
      this.ws.webSocketData(endpoints.TogetherAskUser, {} as TogetherAskOverviewDTO),
    )
  }

  askUser(ask: TogetherAskUserDTO) {
    return this.api.callApi(endpoints.TogetherAskUser, ask, 'POST').subscribe();
  }

  answerUser(answer: TogetherAskAnswerDTO) {
    return this.api.callApi(endpoints.TogetherAskUser, answer, 'PUT').subscribe();
  }

  getFilteredUsers(username: string, grade: number, goodSubject: number, badSubject: number): Observable<TogetherUserProfileDTO[]> {
    const filter = {
      username,
      grade,
      goodSubject,
      badSubject,
    };
    return this.api.callApi<TogetherUserProfileDTO[]>(endpoints.TogetherUsersFilter, filter, 'GET');
  }
}
