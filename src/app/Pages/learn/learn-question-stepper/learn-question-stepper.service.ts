import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { LearnAnswerDTO } from 'src/app/DTOs/Learn/LearnAnswerDTO';
import { LearnMarkQuestionDTO } from 'src/app/DTOs/Learn/LearnMarkQuestionDTO';
import { LearnQuestionDTO } from 'src/app/DTOs/Learn/LearnQuestionDTO';
import { LearnQuestionSetCorrectDTO } from 'src/app/DTOs/Learn/LearnQuestionSetCorrectDTO';
import { LearnSolutionDTO } from 'src/app/DTOs/Learn/LearnSolutionDTO';
import { ApiExtensionService } from 'src/app/Framework/API/api-extension.service';

@Injectable({
  providedIn: 'root'
})
export class LearnQuestionStepperService {

  constructor(
    private api: ApiExtensionService,
  ) { }

  markQuestion$(value: LearnMarkQuestionDTO) {
    return this.api.callApi(endpoints.LearnMarkQuestion, value, 'POST');
  }

  cardAnswer$(learnSessionId: string, questionId: string) {
    const value = {
      learnSessionId,
      questionId
    };
    return this.api.callApi<LearnSolutionDTO>(endpoints.LearnQuestionAnswerCard, value, 'GET');
  }

  writeSolution$(learnSessionId: string, questionId: string) {
    const value = {
      learnSessionId,
      questionId
    };
    return this.api.callApi<LearnSolutionDTO>(endpoints.LearnQuestionAnswerWrite, value, 'GET');
  }

  writeAnswer$(value: LearnAnswerDTO) {
    return this.api.callApi(endpoints.LearnQuestionAnswerWrite, value, 'POST');
  }

  changeCorrectIncorrect$(value: LearnQuestionSetCorrectDTO) {
    return this.api.callApi(endpoints.LearnQuestionSetCorrect, value, 'POST');
  }

  getQuestions$(learnSessionId: string) {
    return this.api.callApi<LearnQuestionDTO[]>(endpoints.LearnSessionQuestions, { learnSessionId }, 'GET');
  }
}
