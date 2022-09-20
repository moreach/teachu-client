import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/Config/appRoutes';
import { LearnQuestionDTO } from 'src/app/DTOs/Learn/LearnQuestionDTO';
import { getQuestionTypes } from 'src/app/DTOs/Enums/QuestionType';

@Component({
  selector: 'app-learn-result',
  templateUrl: './learn-result.component.html',
  styleUrls: ['./learn-result.component.scss']
})
export class LearnResultComponent {

  @Input() questions: LearnQuestionDTO[] = [];

  constructor(
    private router: Router,
  ) { }

  cleanupAnswer(answer: LearnQuestionDTO) {
    let answerCleanup = answer.answerByUser ?? '';
    if (answerCleanup === '' || answerCleanup === '-') {
      return '-';
    }
    const questionType = getQuestionTypes().filter(t => t.value === answer.question.questionType)[0].key;
    if (questionType === 'Distribute') {
      answerCleanup = answerCleanup.split('||').map(ans => {
        const leftSide = answer.question.answerSetOne?.filter(a => a.answerId === ans.split('|')[0])[0].answer;
        const rightSide = answer.question.answerSetTwo?.filter(a => a.answerId === ans.split('|')[1])[0].answer;
        return `${leftSide} - ${rightSide}`;
      }).join(' & ');
    }
    if (questionType === 'MultipleChoice') {
      answerCleanup = answerCleanup.split('|').map(ans => {
        return answer.question.answerSetOne?.filter(a => a.answerId === ans)[0].answer;
      }).join(' & '); 
    }
    return answerCleanup !== '' ? answerCleanup : '-';
  }

  back() {
    this.router.navigate([appRoutes.App, appRoutes.Learn]);
  }
}