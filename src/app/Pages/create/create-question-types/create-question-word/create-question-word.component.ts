import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionWordDTO } from 'src/app/DTOs/Create/CreateQuestionWordDTO';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-create-question-word',
  templateUrl: './create-question-word.component.html',
  styleUrls: ['./create-question-word.component.scss']
})
export class CreateQuestionWordComponent {

  formGroup: FormGroupTyped<CreateQuestionWordDTO>;
  @Input() set question (q: CreateQuestionWordDTO) {
    this.formGroup.patchValue(q);
  }
  @Input() editable: boolean = false;
  @Output() questionChange: EventEmitter<CreateQuestionWordDTO> = new EventEmitter();
  @Output() questionDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      languageSubjectMain: '',
      languageSubjectSecond: '',
    }) as FormGroupTyped<CreateQuestionWordDTO>;
  }

  deleteQuestion() {
    this.questionDelete.emit(this.formGroup.value.id);
  }

  changeQuestion() {
    this.questionChange.emit(this.formGroup.value);
  }
}