import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionMathematicDTO } from 'src/app/DTOs/Create/CreateQuestionMathematicDTO';
import { CreateQuestionMathematicVariableDTO } from 'src/app/DTOs/Create/CreateQuestionMathematicVariableDTO';
import { FormGroupTyped } from 'src/app/Material/types';
import { v4 as guid } from 'uuid';
import * as mathjs from 'mathjs'
import { MatDialog } from '@angular/material/dialog';
import { CreateQuestionMathematicCheckDialogComponent } from './create-question-mathematic-check-dialog/create-question-mathematic-check-dialog.component';

@Component({
  selector: 'app-create-question-mathematic',
  templateUrl: './create-question-mathematic.component.html',
  styleUrls: ['./create-question-mathematic.component.scss']
})
export class CreateQuestionMathematicComponent {

  formGroup: FormGroupTyped<CreateQuestionMathematicDTO>;
  currentChildValue: CreateQuestionMathematicVariableDTO[] = [];
  @Input() set question (q: CreateQuestionMathematicDTO) {
    this.formGroup.patchValue(q);
    this.currentChildValue = q.variables;
  }
  @Input() editable: boolean = false;
  @Output() questionChange: EventEmitter<CreateQuestionMathematicDTO> = new EventEmitter();
  @Output() questionDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      question: '',
      answer: '',
      digits: 0,
      variables: [],
    }) as any as FormGroupTyped<CreateQuestionMathematicDTO>;
  }

  deleteQuestion() {
    this.questionDelete.emit(this.formGroup.value.id);
  }

  changeQuestion() {
    const value = {
      ...this.formGroup.value,
      variables: this.currentChildValue,
    } as CreateQuestionMathematicDTO;
    this.questionChange.emit(value);
  }

  addQuestion() {
    this.currentChildValue = [...this.currentChildValue, {
      id: guid(),
      display: '',
      min: 0,
      max: 0,
      digits: 0,
      interval: 0,
    } as CreateQuestionMathematicVariableDTO];
  }

  deleteAnswer(setId: string) {
    this.currentChildValue = this.currentChildValue.filter(a => a.id !== setId);
    this.changeQuestion();
  }

  changeAnswer(answer: CreateQuestionMathematicVariableDTO) {
    this.currentChildValue = this.currentChildValue.map(a => a.id === answer.id ? answer : a);
    this.changeQuestion();
  }

  checkQuestion() {
    const question = this.formGroup.value.question;
    const answerPlain = this.formGroup.value.answer;
    const variables = this.currentChildValue;
    const answerMin = variables.reduce((acc, v) => {
      return acc.replace(v.display, (v.min ?? 0).toString());
    }, answerPlain);
    const answerMax = variables.reduce((acc, v) => {
      return acc.replace(v.display, (v.max ?? 0).toString());
    }, answerPlain);
    let minEvaluated;
    let minError = false;
    let maxEvaluated;
    let maxError = false;
    try {
      minEvaluated = mathjs.evaluate(answerMin);
      minEvaluated = mathjs.round(minEvaluated, this.formGroup.value.digits);
    } catch {
      minEvaluated = 'create.errorOccured';
      minError = true;
    }
    try {
      maxEvaluated = mathjs.evaluate(answerMax);
      maxEvaluated = mathjs.round(maxEvaluated, this.formGroup.value.digits);
    } catch {
      maxEvaluated = 'create.errorOccured';
      maxError = true;
    }
    if (answerMin.includes('^')) {
      minEvaluated = 'create.errorOccured';
      minError = true;
    }
    if (answerMax.includes('^')) {
      maxEvaluated = 'create.errorOccured';
      maxError = true;
    }
    this.dialog.open(CreateQuestionMathematicCheckDialogComponent, {
      data: {
        question,
        answer: answerPlain,
        answerMin,
        answerMax,
        minEvaluated,
        maxEvaluated,
        minError,
        maxError,
      },
      width: '520px',
    });
  }
}
