import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sex, SEXS } from 'src/app/Enums/Sex';

@Component({
  selector: 'app-classlist-detail',
  templateUrl: './classlist-detail.component.html',
  styleUrls: ['./classlist-detail.component.scss']
})
export class ClasslistDetailComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  getData() {
    return this.data;
  }

  sexCaption(sex: Sex) {
    return SEXS.find(s => s.value === sex)?.key ?? '';
  }
}
