import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LessonDTO } from 'src/app/DTOs/LessonDTO';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-timetable-calendar',
  templateUrl: './timetable-calendar.component.html',
  styleUrls: ['./timetable-calendar.component.scss']
})
export class TimetableCalendarComponent {

  startOfWeek: Date = new Date();
  endOfWeek: Date = new Date();
  days: Date[] = [];

  @Input() set relevantDate(day: Date) {
    this.startOfWeek = this.timetableService.getFirstDayOfWeek(day);
    this.endOfWeek = this.timetableService.getLastDayOfWeek(day);

    let start = this.startOfWeek;
    this.days = [];
    while (start <= this.endOfWeek) {
      this.days.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }

    this.startOfWeek = this.timetableService.getFirstDayOfWeek(day);
  }
  @Input() lessons: LessonDTO[] = [];

  @Output() changeRelevantDate = new EventEmitter<number>();

  constructor(
    private timetableService: TimetableService,
  ) { }

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

  getLessonsOfDay(day: Date) {
    return this.lessons.filter(lesson => lesson.start.toDateString() === day.toDateString());
  }

  getColor() {
    // todo
    return 'var(--teachu-accent)';
  }

  getHeight() {
    // todo
    return 'calc(64px - 4px)';
  }

  getMarginTop() {
    // todo
    return 'calc(-128px + 2px)';
  }
}
