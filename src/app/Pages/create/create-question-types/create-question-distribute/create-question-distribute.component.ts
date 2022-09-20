import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionDistributeAnswerDTO } from 'src/app/DTOs/Create/createQuestionDistributeAnswerDTO';
import { CreateQuestionDistributeDTO } from 'src/app/DTOs/Create/CreateQuestionDistributeDTO';
import { FormGroupTyped } from 'src/app/Material/types';
import { v4 as guid } from 'uuid';

@Component({
  selector: 'app-create-question-distribute',
  templateUrl: './create-question-distribute.component.html',
  styleUrls: ['./create-question-distribute.component.scss']
})
export class CreateQuestionDistributeComponent {

  formGroup: FormGroupTyped<CreateQuestionDistributeDTO>;
  currentChildValue: CreateQuestionDistributeAnswerDTO[] = [];
  @Input() set question (q: CreateQuestionDistributeDTO) {
    this.formGroup.patchValue(q);
    this.currentChildValue = q.answers;
  }
  @Input() editable: boolean = false;
  @Output() questionChange: EventEmitter<CreateQuestionDistributeDTO> = new EventEmitter();
  @Output() questionDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      question: '',
      answers: [],
    }) as any as FormGroupTyped<CreateQuestionDistributeDTO>;
  }

  deleteQuestion() {
    this.questionDelete.emit(this.formGroup.value.id);
  }

  changeQuestion() {
    const value = {
      ...this.formGroup.value,
      answers: this.currentChildValue,
    } as CreateQuestionDistributeDTO;
    this.questionChange.emit(value);
  }

  addQuestion() {
    this.currentChildValue = [...this.currentChildValue, {
      id: guid(),
      leftSide: '',
      leftSideId: guid(),
      rightSide: '',
      rightSideId: guid(),
    } as CreateQuestionDistributeAnswerDTO];
  }

  deleteAnswer(setId: string) {
    this.currentChildValue = this.currentChildValue.filter(a => a.id !== setId);
    this.changeQuestion();
  }

  changeAnswer(answer: CreateQuestionDistributeAnswerDTO) {
    this.currentChildValue = this.currentChildValue.map(a => a.id === answer.id ? answer : a);
    this.changeQuestion();
  }
}