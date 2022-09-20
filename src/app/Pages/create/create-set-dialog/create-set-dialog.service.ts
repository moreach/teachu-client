import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { CreateUpsertSetHeaderDTO } from 'src/app/DTOs/Create/CreateUpsertSetHeaderDTO';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class CreateSetDialogService {

  constructor(
    private api: ApiService,
  ) { }

  getHeader(setId: string) {
    return this.api.callApi<CreateUpsertSetHeaderDTO>(endpoints.CreateSetHeader, { setId }, 'GET');
  }

  upsertHeader(value: CreateUpsertSetHeaderDTO) {
    return this.api.callApi(endpoints.CreateSetHeader, value, 'POST');
  }
}