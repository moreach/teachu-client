import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimetableDayDTO, TimetableLessonDTO } from 'src/app/DTOs/Timetable/TimetableDayDTO';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss']
})
export class LessonDetailsComponent {

  lesson: TimetableLessonDTO | null = null;
  day: TimetableDayDTO | undefined = undefined;
  date: Date;
  subject: string | undefined = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (this.data.lesson) {
      this.lesson = this.data.lesson;
    }
    if (this.data.day) {
      this.day = this.data.day;
    }
    this.date = this.data.date;
    if (this.data.subject) {
      this.subject = this.data.subject;
    }
  }
}
