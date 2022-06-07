import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LessonDTO } from 'src/app/DTOs/LessonDTO';

@Component({
  selector: 'app-timetable-calendar',
  templateUrl: './timetable-calendar.component.html',
  styleUrls: ['./timetable-calendar.component.scss']
})
export class TimetableCalendarComponent {

  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  @Input() lessons: LessonDTO[] = [];

  @Output() changeRelevantDate = new EventEmitter<number>();

  constructor() { }

  getAllDates(): Date[] {
    const dates: Date[] = [];
    const start = this.startDate;
    const end = this.endDate;
    while (start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  }

  getHours(firstEmpty: boolean = false) {
    const hours: string[] = [];
    for (let i = 0; i < 14; i++) {
      if (firstEmpty && i === 0) {
        hours.push('');
      } else {
        hours.push((i + 6) + ':00');
      }
    }
    return hours;
  }

  isToday(date: Date) {
    return date.toDateString() === new Date().toDateString();
  }

  changeWeek(weeks: number) {
    this.changeRelevantDate.emit(weeks * 7);
  }
}
