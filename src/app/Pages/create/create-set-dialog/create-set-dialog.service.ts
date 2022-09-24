import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { CreateUpsertSetHeaderDTO } from 'src/app/DTOs/Create/CreateUpsertSetHeaderDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class CreateSetDialogService {

  constructor(
    private extensionApi: ApiExtensionService,
  ) { }

  getHeader(setId: string) {
    return this.extensionApi.callApi<CreateUpsertSetHeaderDTO>(endpoints.CreateSetHeader, { setId }, 'GET');
  }

  upsertHeader(value: CreateUpsertSetHeaderDTO) {
    return this.extensionApi.callApi(endpoints.CreateSetHeader, value, 'POST');
  }
}