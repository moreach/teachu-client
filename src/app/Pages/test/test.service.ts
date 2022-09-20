import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { TestDTO } from 'src/app/DTOs/Test/TestDTO';
import { TestIdDTO } from 'src/app/DTOs/Test/TestIdDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  openTests$() {
    return this.api.callApi<TestDTO[]>(endpoints.TestOpen, { }, 'GET');
  }

  closedTests$() {
    return this.api.callApi<TestDTO[]>(endpoints.TestClosed, { }, 'GET');
  }

  testStart$(testId: string) {
    const value = {
      testId
    } as TestIdDTO;
    return this.api.callApi<TestIdDTO>(endpoints.TestStart, value, 'POST');
  }
}
