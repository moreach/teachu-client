import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateQuestionMathematicVariableDTO } from 'src/app/DTOs/Create/CreateQuestionMathematicVariableDTO';
import { FormGroupTyped } from 'src/app/Material/types';

@Component({
  selector: 'app-create-question-mathematic-variable',
  templateUrl: './create-question-mathematic-variable.component.html',
  styleUrls: ['./create-question-mathematic-variable.component.scss']
})
export class CreateQuestionMathematicVariableComponent {

  formGroup: FormGroupTyped<CreateQuestionMathematicVariableDTO>;
  @Input() set variable (a: CreateQuestionMathematicVariableDTO) {
    this.formGroup.patchValue(a);
  }
  @Input() editable: boolean = false;
  @Output() answerChange: EventEmitter<CreateQuestionMathematicVariableDTO> = new EventEmitter();
  @Output() answerDelete: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      display: '',
      digits: 0,
      interval: 0,
      min: 0,
      max: 0,
    }) as FormGroupTyped<CreateQuestionMathematicVariableDTO>;
  }

  changeAnswer() {
    this.answerChange.emit(this.formGroup.value);
  }

  deleteAnswer() {
    this.answerDelete.emit(this.formGroup.value.id);
  }
}