import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { ChallengeOpenDTO } from 'src/app/DTOs/Challenge/ChallengeOpenDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  getOpenChallenges() {
    return this.api.callApi<ChallengeOpenDTO[]>(endpoints.ChallengeOpen, { }, 'GET');
  }

  joinChallenge(challengeId: string) {
    return this.api.callApi(endpoints.ChallengeOpen, { challengeId }, 'PUT');
  }

  cancelChallenge(challengeId: string) {
    return this.api.callApi(endpoints.ChallengeOpen, { challengeId }, 'DELETE');
  }
}