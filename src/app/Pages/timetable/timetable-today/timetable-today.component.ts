import { Component, Input, OnInit } from '@angular/core';
import { LessonDTO } from 'src/app/DTOs/LessonDTO';

@Component({
  selector: 'app-timetable-today',
  templateUrl: './timetable-today.component.html',
  styleUrls: ['./timetable-today.component.scss']
})
export class TimetableTodayComponent {

  date: Date = new Date();
  @Input() lessons: LessonDTO[] = [];

  constructor() { }

}
