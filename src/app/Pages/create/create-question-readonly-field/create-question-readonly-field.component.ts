import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-question-readonly-field',
  templateUrl: './create-question-readonly-field.component.html',
  styleUrls: ['./create-question-readonly-field.component.scss']
})
export class CreateQuestionReadonlyFieldComponent {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() twice: boolean = false;

  constructor() { }
}