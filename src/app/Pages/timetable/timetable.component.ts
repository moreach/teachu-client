import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LessonDTO } from 'src/app/DTOs/LessonDTO';
import { TimetableService } from './timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent {

  relevantDateDay$ = new BehaviorSubject<Date>(new Date());
  relevantDateCalendar: Date = new Date();

  constructor(
    private timetableService: TimetableService,
  ) { }

  getLessonsToday$(): Observable<LessonDTO[]> {
    return this.timetableService.getTimetable$(this.relevantDateDay$.value, this.relevantDateDay$.value);
  }

  getLessonsWeek$(): Observable<LessonDTO[]> {
    return this.timetableService.getTimetable$(this.getStartDate(), this.getEndDate());
  }

  getStartDate(){
    return this.timetableService.getFirstDayOfWeek(this.relevantDateCalendar);
  }

  getEndDate(){
    return this.timetableService.getLastDayOfWeek(this.relevantDateCalendar);
  }

  changeRelevantDateDay(days: number) {
    let date = new Date();
    date.setDate(this.relevantDateDay$.value.getDate() + days);
    this.relevantDateDay$.next(date);
  }

  changeRelevantDateCalendar(days: number) {
    this.relevantDateCalendar.setDate(this.relevantDateCalendar.getDate() + days);
  }
}
