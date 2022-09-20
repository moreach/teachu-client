import { KeyValue } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, interval, map, Observable, merge, takeUntil, Subject, filter, switchMap, tap } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { GeneralQuestionAnswerDTO } from 'src/app/DTOs/GeneralQuestion/GeneralQuestionAnswerDTO';
import { TestAnswerDTO } from 'src/app/DTOs/Test/TestAnswerDTO';
import { TestQuestionDTO } from 'src/app/DTOs/Test/TestQuestionDTO';
import { TestQuestionInfoDTO } from 'src/app/DTOs/Test/TestQuestionInfoDTO';
import { TestEndConfirmDialogComponent } from '../test-end-confirm-dialog/test-end-confirm-dialog.component';
import { TestStepperService } from './test-stepper.service';

@Component({
  selector: 'app-test-stepper',
  templateUrl: './test-stepper.component.html',
  styleUrls: ['./test-stepper.component.scss']
})
export class TestStepperComponent implements OnDestroy {

  testOfUserId: string;
  questionsInfo$ = new BehaviorSubject<TestQuestionInfoDTO | undefined>(undefined);
  questionsChoice$: Observable<KeyValue<string, boolean>[]>;
  activeQuestion$ = new BehaviorSubject<TestQuestionDTO | undefined>(undefined);
  activeAnswer$: Observable<string>;
  heartBeat$: Observable<boolean>;
  private destroyed$ = new Subject<void>();
  testEnded = false;
  
  constructor(
    private stepperService: TestStepperService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.testOfUserId = this.activatedRoute.snapshot.paramMap.get(appRoutes.TestId) ?? '';
    this.stepperService.getQuestions$(this.testOfUserId).subscribe(questions => this.questionsInfo$.next(questions));
    this.questionsChoice$ = this.questionsInfo$.pipe(
      filter(questions => !!questions),
      map(questions => questions!.questions.map(question => {
        return {
          key: question.question.questionId,
          value: !!question.answer
        }
      }))
    );
    this.questionsInfo$.pipe(
      filter(questions => !!questions),
      first(),
      map(questions => questions!.questions[0]),
    ).subscribe(question => {
      this.activeQuestion$.next(undefined);
      this.activeQuestion$.next(question)
    });
    this.heartBeat$ = merge(
      interval(1000).pipe(takeUntil(this.destroyed$)),
      this.questionsInfo$.asObservable(),
    ).pipe(map(_ => true));
    this.activeAnswer$ = this.activeQuestion$.asObservable().pipe(
      map(question => {
        if (question) {
          return question.answer ?? '';
        }
        return '';
      }),
      tap(_ => this.changeDetector.detectChanges()),
    );
  }

  answerQuestion(value: GeneralQuestionAnswerDTO) {
    this.questionAnswer(value.answer, this.activeQuestion$.value!.question.questionId);
  }

  questionAnswer(answer: string, questionOfUserId: string) {
    const value = {
      answer,
      questionOfUserId,
    } as TestAnswerDTO;
    this.stepperService.questionAnswer$(value).pipe(
      switchMap(_ => this.stepperService.getQuestions$(this.testOfUserId)),
    ).subscribe(questions => {
      this.questionsInfo$.next(questions);
      const lastQuestionIndex = questions.questions.findIndex(q => q.question.questionId == questionOfUserId);
      if (lastQuestionIndex === questions.questions.length - 1) {
        this.activeQuestion$.next(undefined);
        this.activeQuestion$.next(questions.questions[0]);
      } else {
        this.activeQuestion$.next(undefined);
        this.activeQuestion$.next(questions.questions[lastQuestionIndex + 1]);
      }
    });
  }

  endTest() {
    this.dialog.open(TestEndConfirmDialogComponent, {
      data: this.testOfUserId,
    });
  }

  setQuestionActive(questionId: string) {
    const question = this.questionsInfo$.value!.questions.find(question => question.question.questionId === questionId);
    this.activeQuestion$.next(undefined);
    this.activeQuestion$.next(question);
  }

  getQuestionNumber(questionId: string, choices: KeyValue<string, boolean>[]) {
    return choices.findIndex(choice => choice.key === questionId) + 1;
  }

  getTestName() {
    return this.questionsInfo$.value!.name;
  }

  getTimeLeft(): string | void {
    const end = new Date(this.questionsInfo$.value!.end);
    const timeLeft = end.getTime() - new Date().getTime();
    const hours = Math.floor(timeLeft / 3600000);
    const minutes = Math.floor((timeLeft - hours * 3600000) / 60000);
    const seconds = Math.floor((timeLeft - hours * 3600000 - minutes * 60000) / 1000);
    if (timeLeft <= 0 && !this.testEnded) {
      this.testEnded = true;
      this.stepperService.endTest$(this.testOfUserId).subscribe(_ => {
        this.router.navigate([appRoutes.App, appRoutes.Test]);
      });
    } else if (timeLeft <= 0) {
      return '00:00';
    } else if (hours === 0) {
      return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }

  isActive(questionId: string) {
    return this.activeQuestion$.value?.question.questionId === questionId;
  }

  getCurrentAnswer() {
    return this.activeQuestion$.value?.answer;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
