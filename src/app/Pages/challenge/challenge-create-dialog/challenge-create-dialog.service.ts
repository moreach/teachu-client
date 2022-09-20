import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { ChallengeCreateDTO } from 'src/app/DTOs/Challenge/ChallengeCreateDTO';
import { CreateSetOverviewDTO } from 'src/app/DTOs/Create/CreateSetOverviewDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeCreateDialogService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  createChallenge$(challenge: ChallengeCreateDTO) {
    return this.api.callApi(endpoints.ChallengeOpen, challenge, 'POST');
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