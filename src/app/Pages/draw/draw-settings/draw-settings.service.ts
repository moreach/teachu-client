import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { DrawCollectionUpsertDTO } from 'src/app/DTOs/Draw/DrawCollectionUpsertDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class DrawSettingsService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  upsertSettings$(value: DrawCollectionUpsertDTO) {
    return this.api.callApi(endpoints.DrawCollections, value, 'POST');
  }
}