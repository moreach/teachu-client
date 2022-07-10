import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-readonly-field',
  templateUrl: './readonly-field.component.html',
  styleUrls: ['./readonly-field.component.scss']
})
export class ReadonlyFieldComponent {

  @Input() label: string = '';
  @Input() value: string | null = '';

  constructor() { }

}
