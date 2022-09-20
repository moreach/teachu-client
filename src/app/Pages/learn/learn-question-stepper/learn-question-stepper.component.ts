import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, filter, switchMap, of } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { GeneralQuestionAnswerDTO } from 'src/app/DTOs/GeneralQuestion/GeneralQuestionAnswerDTO';
import { LearnAnswerDTO } from 'src/app/DTOs/Learn/LearnAnswerDTO';
import { LearnMarkQuestionDTO } from 'src/app/DTOs/Learn/LearnMarkQuestionDTO';
import { LearnQuestionDTO } from 'src/app/DTOs/Learn/LearnQuestionDTO';
import { LearnQuestionSetCorrectDTO } from 'src/app/DTOs/Learn/LearnQuestionSetCorrectDTO';
import { LearnSolutionDTO } from 'src/app/DTOs/Learn/LearnSolutionDTO';
import { getQuestionTypes } from 'src/app/DTOs/Enums/QuestionType';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { LearnQuestionStepperService } from './learn-question-stepper.service';

@Component({
  selector: 'app-learn-question-stepper',
  templateUrl: './learn-question-stepper.component.html',
  styleUrls: ['./learn-question-stepper.component.scss']
})
export class LearnQuestionStepperComponent {

  learnSessionId: string;
  activeModeWrite: boolean;
  formGroup: FormGroup;
  questions$ = new BehaviorSubject<LearnQuestionDTO[]>([]);
  activeQuestion$: Observable<LearnQuestionDTO>;
  activeSolution$ = new BehaviorSubject<LearnSolutionDTO | undefined>(undefined);
  progress$: Observable<string>;
  showSolution$: Observable<boolean>;
  showResult$: Observable<boolean>;

  constructor(
    private questionStepperService: LearnQuestionStepperService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.learnSessionId = this.activatedRoute.snapshot.paramMap.get(appRoutes.LearnId) ?? '';
    this.activeModeWrite = window.location.href.split('/').includes(appRoutes.LearnWrite);
    this.formGroup = this.formBuilder.group({
      correct: false,
      hard: false
    });
    this.questionStepperService.getQuestions$(this.learnSessionId).subscribe(questions => this.questions$.next(questions));
    this.showResult$ = this.questions$.asObservable().pipe(
      filter(questions => questions.length > 0),
      map(questions => !questions.some(q => !q.answered))
    );
    this.showResult$.pipe(
      filter(x => !!x),
      switchMap(_ => this.questionStepperService.getQuestions$(this.learnSessionId))
    ).subscribe(questions => this.questions$.next(questions));
    this.activeQuestion$ = this.questions$.asObservable().pipe(
      map(questions => questions.filter(q => !q.answered)),
      filter(questions => questions.length > 0),
      map(questions => questions[0]),
    );
    this.progress$ = this.questions$.asObservable().pipe(
      map(questions => {
        return {
          answered: questions.filter(q => q.answered).length + 1,
          total: questions.length,
        }
      }),
      map(progress => `${progress.answered}/${progress.total}`),
    );
    this.showSolution$ = this.activeSolution$.asObservable().pipe(
      map(solution => !!solution),
    );
  }

  markQuestion(questionId: string) {
    const filtered = this.questions$.value.filter(q => q.question.questionId === questionId);
    const hard = filtered.length > 0 && !filtered[0].markedAsHard;
    const value = {
      learnSessionId: this.learnSessionId,
      questionId,
      hard,
    } as LearnMarkQuestionDTO;
    this.questionStepperService.markQuestion$(value).subscribe(_ => {
      const current = this.questions$.value;
      const next = current.map(q => {
        if (q.question.questionId !== questionId) {
          return q;
        }
        return {
          ...q,
          markedAsHard: hard,
        };
      });
      this.questions$.next(next);
    });
  }

  cardAnswer(questionId: string) {
    this.questionStepperService.cardAnswer$(this.learnSessionId, questionId).subscribe(solution => {
      this.activeSolution$.next(solution);
      const fg = {
        correct: solution.wasCorrect,
        hard: this.isHardQuestion(questionId),
      };
      this.formGroup.patchValue(fg);
    });
  }

  writeSolution(questionId: string) {
    this.questionStepperService.writeSolution$(this.learnSessionId, questionId).subscribe(solution => {
      this.activeSolution$.next(solution);
      const fg = {
        correct: solution.wasCorrect,
        hard: this.isHardQuestion(questionId) || !solution.wasCorrect,
      };
      this.formGroup.patchValue(fg);
    });
  }

  writeAnswer(question: GeneralQuestionAnswerDTO) {
    const answer = question.answer;
    const questionId = question.questionId;
    const value = {
      learnSessionId: this.learnSessionId,
      questionId,
      answer,
    } as LearnAnswerDTO;
    this.questionStepperService.writeAnswer$(value).subscribe(_ => this.writeSolution(questionId));
  }

  changeCorrectIncorrect(solution: LearnSolutionDTO) {
    const correct = this.formGroup.value.correct;
    const value = {
      learnSessionId: this.learnSessionId,
      questionId: solution.questionId,
      correct,
    } as LearnQuestionSetCorrectDTO;
    this.questionStepperService.changeCorrectIncorrect$(value).subscribe(_ => {
      const newSolution = {
        ...solution,
        wasCorrect: correct,
      };
      this.activeSolution$.next(newSolution);
    });
  }

  nextQuestion(currentQuestionId: string) {
    const current = this.questions$.value;
    const next = current.map(q => {
      if (q.question.questionId !== currentQuestionId) {
        return q;
      }
      return {
        ...q,
        answered: true,
      };
    });
    this.questions$.next(next);
    this.activeSolution$.next(undefined);
  }

  changeMode() {
    if (this.activeModeWrite) {
      this.router.navigate([appRoutes.App, appRoutes.Learn, appRoutes.LearnCard, this.learnSessionId]);
    } else {
      this.router.navigate([appRoutes.App, appRoutes.Learn, appRoutes.LearnWrite, this.learnSessionId]);
    }
  }

  translateSubject(subject: string) {
    const filtered = getSubjects().filter(s => s.value === parseInt(subject));
    if (filtered.length === 0) {
      return '';
    }
    return 'Subject.' + filtered[0].key;
  }

  getQuestionType(type: number) {
    return getQuestionTypes().filter(t => t.value === type)[0].key;
  }

  isHardQuestion(questionId: string) {
    const filtered = this.questions$.value.filter(q => q.question.questionId === questionId);
    return filtered.length > 0 && filtered[0].markedAsHard;
  }
}