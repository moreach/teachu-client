import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LessonDTO } from 'src/app/DTOs/LessonDTO';

@Component({
  selector: 'app-timetable-today',
  templateUrl: './timetable-today.component.html',
  styleUrls: ['./timetable-today.component.scss']
})
export class TimetableTodayComponent {

  @Input() date: Date = new Date();
  @Input() lessons: LessonDTO[] = [];
  @Output() changeRelevantDate = new EventEmitter<number>();

  constructor() { }

  changeDay(days: number) {
    this.changeRelevantDate.emit(days);
  }
}
