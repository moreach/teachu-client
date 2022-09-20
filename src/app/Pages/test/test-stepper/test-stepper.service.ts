import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { TestAnswerDTO } from 'src/app/DTOs/Test/TestAnswerDTO';
import { TestIdDTO } from 'src/app/DTOs/Test/TestIdDTO';
import { TestQuestionInfoDTO } from 'src/app/DTOs/Test/TestQuestionInfoDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class TestStepperService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  getQuestions$(testOfUserId: string) {
    return this.api.callApi<TestQuestionInfoDTO>(endpoints.TestQuestions, { testOfUserId }, 'GET');
  }

  questionAnswer$(value: TestAnswerDTO) {
    return this.api.callApi(endpoints.TestQuestions, value, 'POST');
  }

  endTest$(testOfUserId: string) {
    const value = {
      testId: testOfUserId,
    } as TestIdDTO;
    return this.api.callApi(endpoints.TestEnd, value, 'POST');
  }
}
