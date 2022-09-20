import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { CreateUpsertSetHeaderDTO } from 'src/app/DTOs/Create/CreateUpsertSetHeaderDTO';
import { CreateUpsertSetQuestionsDTO } from 'src/app/DTOs/Create/CreateUpsertSetQuestionsDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class CreateSetEditService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  getHeader$(setId: string) {
    return this.api.callApi<CreateUpsertSetHeaderDTO>(endpoints.CreateSetHeader, { setId }, 'GET');
  }

  setHeader(value: CreateUpsertSetHeaderDTO) {
    this.api.callApi(endpoints.CreateSetHeader, { value }, 'POST').subscribe();
  }

  getQuestions$(setId: string) {
    return this.api.callApi<CreateUpsertSetQuestionsDTO>(endpoints.CreateSetQuestions, { setId }, 'GET');
  }

  setQuestions(value: CreateUpsertSetQuestionsDTO) {
    this.api.callApi(endpoints.CreateSetQuestions, { ...value }, 'POST').subscribe();
  }
}
