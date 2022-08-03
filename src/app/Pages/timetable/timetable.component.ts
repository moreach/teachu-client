import { KeyValue } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { TimetableDayDTO, TimetableLessonDTO } from 'src/app/DTOs/Timetable/TimetableDayDTO';
import { TimetableLayoutDTO } from 'src/app/DTOs/Timetable/TimetableLayoutDTO';
import { addDays, equalDates, getFirstDayOfWeek, getLastDayOfWeek } from 'src/app/Framework/Helpers/DateHelpers';
import { LessonDetailsComponent } from './lesson-details/lesson-details.component';
import { TimetableService } from './timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  relevantDate$ = new BehaviorSubject(new Date());
  isWeekView$ = new BehaviorSubject(false);
  dates$: Observable<Date[]>;
  startDate$: Observable<Date>;
  endDate$: Observable<Date>;
  classToColor: KeyValue<string, string>[] = [];
  VIEW_BREAK_POINT: number = 1100;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isWeekView$.next(window.innerWidth >= this.VIEW_BREAK_POINT);
  }

  constructor(
    private timetableService: TimetableService,
    private dialog: MatDialog,
  ) { 
    this.dates$ = combineLatest([
      this.relevantDate$,
      this.isWeekView$
    ]).pipe(
      map(([relevantDate, isWeekView]) => {
        if (isWeekView) {
          let days = [];
          let start = getFirstDayOfWeek(relevantDate);
          const end = getLastDayOfWeek(relevantDate);
          while (start <= end) {
            days.push(new Date(start));
            start.setDate(start.getDate() + 1);
          }
          return days;
        } else {
          return [this.relevantDate$.value];
        }
      }
    ));

    this.startDate$ = this.dates$.pipe(
      map(dates => dates[0])
    );

    this.endDate$ = this.dates$.pipe(
      map(dates => dates[dates.length - 1])
    );
  }

  ngOnInit(): void {
    this.isWeekView$.next(window.innerWidth >= this.VIEW_BREAK_POINT);
  }

  getLessons$(): Observable<TimetableDayDTO[]> {
    const start = this.isWeekView$.value ? getFirstDayOfWeek(this.relevantDate$.value) : this.relevantDate$.value;
    const end = this.isWeekView$.value ? getLastDayOfWeek(this.relevantDate$.value) : this.relevantDate$.value;
    return this.timetableService.getTimetable$(start, end);
  }

  getCorrespondingLesson(days: TimetableDayDTO[], date: Date, timetableId: string): TimetableLessonDTO | undefined {
    const filteredDays = days.filter(d => equalDates(d.date, date));
    if (filteredDays.length === 0) {
      return undefined;
    }
    const lessons = filteredDays[0].lessons;
    const matchingLesson = lessons.filter(l => l.timetableId === timetableId);
    return matchingLesson.length === 0 ? undefined : matchingLesson[0];
  }

  getLessonsInfo$(): Observable<TimetableLayoutDTO[]> {
    return this.timetableService.getLessonInfo$();
  }

  changeRelevantDate(value: number) {
    const days = value * (this.isWeekView$.value ? 7 : 1);
    this.relevantDate$.next(addDays(this.relevantDate$.value, days));
  }

  isToday(date: Date): boolean {
    return equalDates(date, new Date());
  }

  getColor(lesson: TimetableLessonDTO, allLessons: TimetableDayDTO[]): string {
    const colors = ['primary', 'accent', 'warn', 'secondary'];
    let color = 0;
    const lessons = allLessons.flatMap(d => d.lessons);
    for (let l of lessons) {
      if (!this.classToColor.some(cc => cc.key === l.schoolClass)) {
        this.classToColor.push({
          key: l.schoolClass,
          value: `var(--teachu-${colors[color % colors.length]})`
        });
        color++;
      }
    }
    return this.classToColor.find(cc => cc.key === lesson.schoolClass)?.value ?? `var(--teachu-${colors[0]})`;
  }

  getFontColor(background: string): string {
    return (background === 'var(--teachu-primary)') ? 'var(--teachu-white)' : 'var(--teachu-black)';
  }

  openDetails(lesson: TimetableLessonDTO, days: TimetableDayDTO[]) {
    const day = days.find(d => equalDates(d.date, this.relevantDate$.value));
    this.dialog.open(LessonDetailsComponent, {
      data: {
        lesson,
        day
      }
    });
  }
}
