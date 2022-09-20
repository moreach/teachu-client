import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { ChallengeActiveDTO } from 'src/app/DTOs/Challenge/ChallengeActiveDTO';
import { GeneralQuestionAnswerDTO } from 'src/app/DTOs/GeneralQuestion/GeneralQuestionAnswerDTO';
import { ChallengeIdDTO } from 'src/app/DTOs/Challenge/ChallengeIdDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { WebSocketService } from 'src/app/Framework/API/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeActiveService {

  constructor(
    private api: ApiService,
    private ws: WebSocketService,
  ) { }

  getActiveChallenge(challengeId: string): Observable<ChallengeActiveDTO> {
    return merge(
      this.api.callApi<ChallengeActiveDTO>(endpoints.ChallengeActive, { challengeId }, 'GET'),
      this.ws.webSocketData<ChallengeActiveDTO>(endpoints.ChallengeActive, {} as ChallengeActiveDTO, challengeId),
    );
  }

  challengeNextFlow(value: ChallengeIdDTO) {
    this.api.callApi(endpoints.ChallengeFlow, value, 'POST').subscribe();
  }

  challengeAnswer(value: GeneralQuestionAnswerDTO) {
    this.api.callApi(endpoints.ChallengeAnswer, value, 'POST').subscribe();
  }
}