import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionMultipleChoiceAnswerDTO } from 'src/app/DTOs/Create/createQuestionMultipleChoiceAnswerDTO';
import { CreateQuestionMultipleChoiceDTO } from 'src/app/DTOs/Create/CreateQuestionMultipleChoiceDTO';
import { FormGroupTyped } from 'src/app/Material/types';
import { v4 as guid } from 'uuid';

@Component({
  selector: 'app-create-question-multiple-choice',
  templateUrl: './create-question-multiple-choice.component.html',
  styleUrls: ['./create-question-multiple-choice.component.scss']
})
export class CreateQuestionMultipleChoiceComponent {

  formGroup: FormGroupTyped<CreateQuestionMultipleChoiceDTO>;
  currentChildValue: CreateQuestionMultipleChoiceAnswerDTO[] = [];
  @Input() set question (q: CreateQuestionMultipleChoiceDTO) {
    this.formGroup.patchValue(q);
    this.currentChildValue = q.answers;
  }
  @Input() editable: boolean = false;
  @Output() questionChange: EventEmitter<CreateQuestionMultipleChoiceDTO> = new EventEmitter();
  @Output() questionDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      question: '',
      answers: [],
    }) as any as FormGroupTyped<CreateQuestionMultipleChoiceDTO>;
  }

  deleteQuestion() {
    this.questionDelete.emit(this.formGroup.value.id);
  }

  changeQuestion() {
    const value = {
      ...this.formGroup.value,
      answers: this.currentChildValue,
    } as CreateQuestionMultipleChoiceDTO;
    this.questionChange.emit(value);
  }

  addQuestion() {
    this.currentChildValue = [...this.currentChildValue, {
      id: guid(),
      answer: '',
      isRight: false,
    } as CreateQuestionMultipleChoiceAnswerDTO];
  }

  deleteAnswer(setId: string) {
    this.currentChildValue = this.currentChildValue.filter(a => a.id !== setId);
    this.changeQuestion();
  }

  changeAnswer(answer: CreateQuestionMultipleChoiceAnswerDTO) {
    this.currentChildValue = this.currentChildValue.map(a => a.id === answer.id ? answer : a);
    this.changeQuestion();
  }
}