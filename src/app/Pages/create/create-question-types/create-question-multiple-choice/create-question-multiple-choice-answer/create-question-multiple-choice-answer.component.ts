import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionMultipleChoiceAnswerDTO } from 'src/app/DTOs/Create/createQuestionMultipleChoiceAnswerDTO';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-create-question-multiple-choice-answer',
  templateUrl: './create-question-multiple-choice-answer.component.html',
  styleUrls: ['./create-question-multiple-choice-answer.component.scss']
})
export class CreateQuestionMultipleChoiceAnswerComponent {

  formGroup: FormGroupTyped<CreateQuestionMultipleChoiceAnswerDTO>;
  @Input() set answer (a: CreateQuestionMultipleChoiceAnswerDTO) {
    this.formGroup.patchValue(a);
  }
  @Input() editable: boolean = false;
  @Output() answerChange: EventEmitter<CreateQuestionMultipleChoiceAnswerDTO> = new EventEmitter();
  @Output() answerDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      answer: '',
      isRight: false,
    }) as FormGroupTyped<CreateQuestionMultipleChoiceAnswerDTO>;
  }

  changeAnswer() {
    this.answerChange.emit(this.formGroup.value);
  }

  deleteAnswer() {
    this.answerDelete.emit(this.formGroup.value.id);
  }
}