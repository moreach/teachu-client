import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionTextFieldDTO } from 'src/app/DTOs/Create/CreateQuestionTextFieldDTO';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-create-question-text-field',
  templateUrl: './create-question-text-field.component.html',
  styleUrls: ['./create-question-text-field.component.scss']
})
export class CreateQuestionTextFieldComponent {

  formGroup: FormGroupTyped<CreateQuestionTextFieldDTO>;
  @Input() set question (q: CreateQuestionTextFieldDTO) {
    this.formGroup.patchValue(q);
  }
  @Input() editable: boolean = false;
  @Output() questionChange: EventEmitter<CreateQuestionTextFieldDTO> = new EventEmitter();
  @Output() questionDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      question: '',
    }) as FormGroupTyped<CreateQuestionTextFieldDTO>;
  }

  deleteQuestion() {
    this.questionDelete.emit(this.formGroup.value.id);
  }

  changeQuestion() {
    this.questionChange.emit(this.formGroup.value);
  }
}