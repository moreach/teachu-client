import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { LearnSessionDTO } from 'src/app/DTOs/Learn/LearnSessionDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  getClosedSessions$() {
    return this.api.callApi<LearnSessionDTO[]>(endpoints.LearnClosedSession, { }, 'GET');
  }

  getOpenSessions$() {
    return this.api.callApi<LearnSessionDTO[]>(endpoints.LearnOpenSession, { }, 'GET');
  }
}
