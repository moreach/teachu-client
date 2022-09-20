import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { CreateSetOverviewDTO } from 'src/app/DTOs/Create/CreateSetOverviewDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  getLatest() {
    return this.api.callApi<CreateSetOverviewDTO[]>(endpoints.CreateLastSets, { }, 'GET');
  }

  getFiltered(subjectMain: number, subjectSecond: number, name: string) {
    const filter = {
      subjectMain,
      subjectSecond,
      name
    };
    return this.api.callApi<CreateSetOverviewDTO[]>(endpoints.CreateFilterSets, filter, 'GET');
  }

  getOwn() {
    return this.api.callApi<CreateSetOverviewDTO[]>(endpoints.CreateOwnSets, { }, 'GET');
  }
}
