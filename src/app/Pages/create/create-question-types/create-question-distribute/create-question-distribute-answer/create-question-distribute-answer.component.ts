import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionDistributeAnswerDTO } from 'src/app/DTOs/Create/createQuestionDistributeAnswerDTO';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-create-question-distribute-answer',
  templateUrl: './create-question-distribute-answer.component.html',
  styleUrls: ['./create-question-distribute-answer.component.scss']
})
export class CreateQuestionDistributeAnswerComponent {

  formGroup: FormGroupTyped<CreateQuestionDistributeAnswerDTO>;
  @Input() set answer (a: CreateQuestionDistributeAnswerDTO) {
    this.formGroup.patchValue(a);
  }
  @Input() editable: boolean = false;
  @Output() answerChange: EventEmitter<CreateQuestionDistributeAnswerDTO> = new EventEmitter();
  @Output() answerDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      leftSide: '',
      leftSideId: '',
      rightSide: '',
      rightSideId: '',
    }) as FormGroupTyped<CreateQuestionDistributeAnswerDTO>;
  }

  changeAnswer() {
    this.answerChange.emit(this.formGroup.value);
  }

  deleteAnswer() {
    this.answerDelete.emit(this.formGroup.value.id);
  }
}