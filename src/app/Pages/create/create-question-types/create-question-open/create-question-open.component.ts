import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionOpenQuestionDTO } from 'src/app/DTOs/Create/CreateQuestionOpenQuestionDTO';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-create-question-open',
  templateUrl: './create-question-open.component.html',
  styleUrls: ['./create-question-open.component.scss']
})
export class CreateQuestionOpenComponent {

  formGroup: FormGroupTyped<CreateQuestionOpenQuestionDTO>;
  @Input() set question (q: CreateQuestionOpenQuestionDTO) {
    this.formGroup.patchValue(q);
  }
  @Input() editable: boolean = false;
  @Output() questionChange: EventEmitter<CreateQuestionOpenQuestionDTO> = new EventEmitter();
  @Output() questionDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      answer: '',
      question: '',
    }) as FormGroupTyped<CreateQuestionOpenQuestionDTO>;
  }

  deleteQuestion() {
    this.questionDelete.emit(this.formGroup.value.id);
  }

  changeQuestion() {
    this.questionChange.emit(this.formGroup.value);
  }
}