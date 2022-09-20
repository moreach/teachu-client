import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TestQuestionResultDTO } from 'src/app/DTOs/Test/TestQuestionResultDTO';
import { TestResultDTO } from 'src/app/DTOs/Test/TestResultDTO';
import { getQuestionTypes } from 'src/app/DTOs/Enums/QuestionType';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { formatTime } from 'src/app/Framework/Helpers/StringHelpers';
import { TestEditPointsComponent } from '../test-edit-points/test-edit-points.component';
import { TestResultService } from './test-result.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent {

  testOfUserId: string;
  userId: string | null;
  pointsAdjustable: boolean;
  result$: Observable<TestResultDTO>;

  constructor(
    private resultService: TestResultService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.testOfUserId = this.activatedRoute.snapshot.paramMap.get(appRoutes.TestId) ?? '';
    this.userId = this.activatedRoute.snapshot.paramMap.get(appRoutes.TestUserId) ?? null;
    this.pointsAdjustable = !!this.userId;
    this.result$ = this.resultService.getResult$(this.testOfUserId, this.userId);
  }

  translateSubject(subject: number) {
    return 'Subject.' + getSubjects().filter(s => s.value === subject)[0].key;
  }

  calculatePercentage(scored: number, possible: number) {
    if (possible === 0) {
      return 0;
    }
    return Math.round(scored / possible * 100 * 100) / 100;
  }

  translateSubjectFromString(subject: string) {
    const filtered = getSubjects().filter(s => s.value === parseInt(subject));
    if (filtered.length === 0) {
      return '';
    }
    return 'Subject.' + filtered[0].key;
  }

  getQuestionType(type: number) {
    return getQuestionTypes().filter(t => t.value === type)[0].key;
  }

  editPoints(questionId: string, isRight: boolean, pointsScored: number) {
    this.dialog.open(TestEditPointsComponent, {
      data: {
        testOfUserId: this.testOfUserId,
        userId: this.userId,
        questionId,
        isCorrect: isRight,
        pointsScored,
      }
    }).afterClosed().subscribe(_ => this.result$ = this.resultService.getResult$(this.testOfUserId, this.userId));
  }

  cleanupAnswer(answer: TestQuestionResultDTO) {
    switch (this.getQuestionType(answer.question.questionType)){
      case 'Distribute':
        const answersDistribute = (answer.answer ?? '').split('||').map(s => {
          return {
            leftId: s.split('|')[0],
            rightId: s.split('|')[1],
          }
        }).map(s => {
          return {
            left: answer.question.answerSetOne?.filter(a => a.answerId === s.leftId)[0]?.answer ?? '',
            right: answer.question.answerSetTwo?.filter(a => a.answerId === s.rightId)[0]?.answer ?? '',
          }
        });
        return answersDistribute.map(s => s.left + ' - ' + s.right).join(' & ');
      case 'MultipleChoice':
        const answersGivenMultipleChoice = (answer.answer ?? '').split('|');
        const answersMultipleChoice = answer.question.answerSetOne?.filter(a => answersGivenMultipleChoice.includes(a.answerId)).map(a => a.answer) ?? [];
        return answersMultipleChoice.join(' & ');
      case 'TrueFalse':
        return answer.answer === 'true' ? 'generalQuestion.true' : 'generalQuestion.false';
      case 'Mathematic':
      case 'OpenQuestion':
      case 'TextField':
      case 'Word':
        return answer.answer;
    }
  }

  cleanupSolution(solution: TestQuestionResultDTO) {
    switch (this.getQuestionType(solution.question.questionType)){
      case 'Distribute':
        const solutionsDistribute = (solution.solution ?? '').split('|||').filter(s => !!s).map(s => {
          return {
            leftId: s.split('||')[0].split('|')[0],
            rightId: s.split('||')[1].split('|')[0],
          }
        }).map(s => {
          return {
            left: solution.question.answerSetOne?.filter(a => a.answerId === s.leftId)[0]?.answer ?? '',
            right: solution.question.answerSetTwo?.filter(a => a.answerId === s.rightId)[0]?.answer ?? '',
          }
        });
        return solutionsDistribute.map(s => s.left + ' - ' + s.right).join(' & ');
      case 'MultipleChoice':
        const solutionsGivenMultipleChoice = (solution.solution ?? '').split('|');
        const solutionsMultipleChoice = solution.question.answerSetOne?.filter(a => solutionsGivenMultipleChoice.includes(a.answerId)).map(a => a.answer) ?? [];
        return solutionsMultipleChoice.join(' & ');
      case 'TrueFalse':
        return solution.solution === 'true' ? 'generalQuestion.true' : 'generalQuestion.false';
      case 'Mathematic':
      case 'OpenQuestion':
      case 'TextField':
      case 'Word':
        return solution.solution;
    }
  }

  isTrueFalse(question: TestQuestionResultDTO) {
    return this.getQuestionType(question.question.questionType) === 'TrueFalse';
  }

  formatTime(minutes: number) {
    return formatTime(minutes);
  }
}