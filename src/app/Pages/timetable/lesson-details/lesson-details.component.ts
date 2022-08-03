import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimetableDayDTO, TimetableLessonDTO } from 'src/app/DTOs/Timetable/TimetableDayDTO';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss']
})
export class LessonDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  getData() {
    return {
      lesson: this.data.lesson as any as TimetableLessonDTO,
      day: this.data.day as any as TimetableDayDTO
    };
  }
}
