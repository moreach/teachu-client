import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { TestCreateDTO } from 'src/app/DTOs/Test/TestCreateDTO';
import { TestGroupTestCreateDTO } from 'src/app/DTOs/Test/TestGroupTestCreateDTO';
import { TestPossibleGroupDTO } from 'src/app/DTOs/Test/TestPossibleGroupDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class TestCreateDialogService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  testCreate$(value: TestCreateDTO) {
    return this.api.callApi(endpoints.TestCreate, value, 'POST');
  }

  testGrouTestCreate$(value: TestGroupTestCreateDTO) {
    return this.api.callApi(endpoints.TestGroupTestCreate, value, 'POST');
  }

  getFilteredGroups$(name: string | null): Observable<KeyValue<string, string>[]> {
    const filter = {
      filter: name ?? '',
    };
    return this.api.callApi<TestPossibleGroupDTO[]>(endpoints.TestPossibleGroups, filter, 'GET').pipe(
      map(groups => groups.map(group => ({ key: group.groupName, value: group.groupId } as KeyValue<string, string>)))
    );
  }
}
