import { KeyValue } from '@angular/common';
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
  _lessons: LessonDTO[] = [];
  classToColor: KeyValue<string, string>[] = [];
  oneHourHeight: number = 32;

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

  @Input() set lessons (lessons: LessonDTO[]) {
    this._lessons = lessons;
    this.classToColor = [];
    let color = 0;
    for (let l of lessons) {
      if (!this.classToColor.some(cc => cc.key === l.class)) {
        this.classToColor.push({
          key: l.class,
          value: `var(--teachu-accent-${(color % 6) + 1})` // FIXME @eric colors were renamed -> accent-? does no longer exist
        });
        color++;
      }
    }
  }

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
    return this._lessons.filter(lesson => lesson.start.toDateString() === day.toDateString());
  }

  getColor(lessons: LessonDTO) {
    return this.classToColor.find(cc => cc.key === lessons.class)?.value;
  }

  getHeight(lesson: LessonDTO) {
    const minutes = (lesson.end.getTime() - lesson.start.getTime()) / (1000 * 60);
    const height = Math.round(minutes * this.oneHourHeight / 60);
    return `${(height - 4)}px`;
  }

  getMarginTop(lesson: LessonDTO) {
    let previous = this.getPreviousLessonEnd(this.getLessonsOfDay(lesson.start), lesson);
    let minutes;
    let marginTop;
    if (previous === undefined) {
      previous = this.getDayAt6(lesson);
      minutes = (lesson.start.getTime() - previous.getTime()) / (1000 * 60);
      marginTop = Math.round(((0 - this.oneHourHeight) * (20 - 6)) + (minutes * this.oneHourHeight / 60)) + 2;
    } else {
      minutes = (lesson.start.getTime() - previous.getTime()) / (1000 * 60);
      marginTop = Math.round(minutes * this.oneHourHeight / 60) + 4;
    }
    return `${marginTop}px`;
  }

  getPreviousLessonEnd(lessons: LessonDTO[], currentLesson: LessonDTO) {
    let previous = null;
    for (let i = 0; i < lessons.length; i++) {
      if (lessons[i] === currentLesson) {
        return previous?.end;
      }
      previous = lessons[i];
    }
    return previous?.end;
  }

  getDayAt6(lesson: LessonDTO) {
    return new Date(lesson.start.getFullYear(), lesson.start.getMonth(), lesson.start.getDate(), 6, 0);
  }
}
