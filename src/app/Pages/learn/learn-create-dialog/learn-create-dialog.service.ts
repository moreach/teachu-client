import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { CreateSetOverviewDTO } from 'src/app/DTOs/Create/CreateSetOverviewDTO';
import { LearnOpenNewSessionDTO } from 'src/app/DTOs/Learn/LearnOpenNewSessionDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class LearnCreateDialogService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  createSession$(value: LearnOpenNewSessionDTO) {
    return this.api.callApi(endpoints.LearnOpenSession, value, 'POST');
  }

  getFilteredSets$(setNameFilter: string): Observable<KeyValue<string, string>[]> {
    const filter = {
      subjectMain: -1,
      subjectSecond: -1,
      name: setNameFilter
    };
    return this.api.callApi<CreateSetOverviewDTO[]>(endpoints.CreateFilterSets, filter, 'GET').pipe(
      map(sets => sets.map(set => ({ key: set.name, value: set.setId } as KeyValue<string, string>)))
    );
  }
}
