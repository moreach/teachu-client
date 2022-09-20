import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TestQuestionSettingDTO } from 'src/app/DTOs/Test/TestQuestionSettingDTO';
import { TestSaveSettingsDTO } from 'src/app/DTOs/Test/TestSaveSettingsDTO';
import { TestSettingDTO } from 'src/app/DTOs/Test/TestSettingDTO';
import { TestSettingsSaveQuestionDTO } from 'src/app/DTOs/Test/TestSettingsSaveQuestionDTO';
import { getQuestionTypes } from 'src/app/DTOs/Enums/QuestionType';
import { getSubjects } from 'src/app/DTOs/Enums/Subject';
import { TestSettingsService } from './test-settings.service';

@Component({
  selector: 'app-test-settings',
  templateUrl: './test-settings.component.html',
  styleUrls: ['./test-settings.component.scss']
})
export class TestSettingsComponent {

  settings$: Observable<TestSettingDTO>;
  testId: string;
  questionIds: string[] = [];
  formGroup: FormGroup;

  constructor(
    private settingsService: TestSettingsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      maxTime: [0, [Validators.required, Validators.min(1)]],
      visible: [true, Validators.required],
      active: [true, Validators.required]
    });
    this.testId = this.activatedRoute.snapshot.paramMap.get(appRoutes.TestId) ?? '';
    this.settings$ = this.settingsService.getSettings$(this.testId);
    this.settings$.pipe(
      first(),
      map(settings => {
        return {
          name: settings.name,
          maxTime: settings.maxTime,
          visible: settings.visible,
          active: settings.active,
          questions: settings.questions,
        }
      }),
    ).subscribe(value => {
      this.formGroup.controls["name"].patchValue(value.name);
      this.formGroup.controls["maxTime"].patchValue(value.maxTime);
      this.formGroup.controls["visible"].patchValue(value.visible);
      this.formGroup.controls["active"].patchValue(value.active);
      for (let question of value.questions) {
        this.formGroup.addControl(question.question.questionId + '_visible', this.formBuilder.control(question.visible, [Validators.required, Validators.min(1)]));
        this.formGroup.addControl(question.question.questionId + '_points', this.formBuilder.control(question.pointsPossible, [Validators.required, Validators.min(1)]));
      }
      this.questionIds = value.questions.map(q => q.question.questionId);
    });
  }

  save() {
    const value = {
      testId: this.testId,
      name: this.formGroup.controls["name"].value,
      maxTime: this.formGroup.controls["maxTime"].value,
      visible: this.formGroup.controls["visible"].value,
      active: this.formGroup.controls["active"].value,
      questions: this.questionIds.map(questionId => {
        return {
          questionId,
          visible: this.formGroup.controls[questionId + '_visible'].value as boolean,
          points: this.formGroup.controls[questionId + '_points'].value as number,
        }
      }) as TestSettingsSaveQuestionDTO[],
    } as TestSaveSettingsDTO;
    this.settingsService.setSettings$(value).subscribe(_ => {
      this.router.navigate([appRoutes.App, appRoutes.Test]);
    });
  }

  translateSubject(subject: number) {
    return 'Subject.' + getSubjects().filter(s => s.value === subject)[0].key;
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

  hideDivider(type: number) {
    return this.getQuestionType(type) === 'OpenQuestion' || this.getQuestionType(type) === 'TextField';
  }

  cleanupSolution(solution: TestQuestionSettingDTO) {
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

  isTrueFalse(question: TestQuestionSettingDTO) {
    return this.getQuestionType(question.question.questionType) === 'TrueFalse';
  }
}
