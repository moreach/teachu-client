import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionTrueFalseDTO } from 'src/app/DTOs/Create/CreateQuestionTrueFalseDTO';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-create-question-true-false',
  templateUrl: './create-question-true-false.component.html',
  styleUrls: ['./create-question-true-false.component.scss']
})
export class CreateQuestionTrueFalseComponent {

  formGroup: FormGroupTyped<CreateQuestionTrueFalseDTO>;
  @Input() set question (q: CreateQuestionTrueFalseDTO) {
    this.formGroup.patchValue(q);
  }
  @Input() editable: boolean = false;
  @Output() questionChange: EventEmitter<CreateQuestionTrueFalseDTO> = new EventEmitter();
  @Output() questionDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      answer: true,
      question: '',
    }) as FormGroupTyped<CreateQuestionTrueFalseDTO>;
  }

  deleteQuestion() {
    this.questionDelete.emit(this.formGroup.value.id);
  }

  changeQuestion() {
    this.questionChange.emit(this.formGroup.value);
  }
}