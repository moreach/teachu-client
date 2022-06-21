import { KeyValue } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { LessonDTO } from 'src/app/DTOs/LessonDTO';
import { LessonInfoDTO } from 'src/app/DTOs/LessonInfoDTO';
import { addDays, equalDates, getFirstDayOfWeek, getLastDayOfWeek } from 'src/app/Framework/Helpers/DateHelpers';
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
  hours: LessonInfoDTO[] = [];
  classToColor: KeyValue<string, string>[] = [];
  VIEW_BREAK_POINT: number = 1100;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isWeekView$.next(window.innerWidth >= this.VIEW_BREAK_POINT);
  }

  constructor(
    private timetableService: TimetableService,
    private router: Router,
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

    this.timetableService.getLessonInfo$().subscribe(infos => this.hours = infos);
  }

  ngOnInit(): void {
    this.isWeekView$.next(window.innerWidth >= this.VIEW_BREAK_POINT);
  }

  getLessons$(): Observable<LessonDTO[]> {
    const start = this.isWeekView$.value ? getFirstDayOfWeek(this.relevantDate$.value) : this.relevantDate$.value;
    const end = this.isWeekView$.value ? getLastDayOfWeek(this.relevantDate$.value) : this.relevantDate$.value;
    return this.timetableService.getTimetable$(start, end);
  }

  getCorrespondingLesson(lessons: LessonDTO[], date: Date, lessonNumber: number): LessonDTO | undefined {
    const filtered = lessons.filter(l => equalDates(l.date, date) && l.lessonNumber === lessonNumber);
    return filtered === [] ? undefined : filtered[0];
  }

  getLessonsInfo$(): Observable<LessonInfoDTO[]> {
    return this.timetableService.getLessonInfo$();
  }

  changeRelevantDate(value: number) {
    const days = value * (this.isWeekView$.value ? 7 : 1);
    this.relevantDate$.next(addDays(this.relevantDate$.value, days));
  }

  isToday(date: Date): boolean {
    return equalDates(date, new Date());
  }

  getColor(lesson: LessonDTO, allLessons: LessonDTO[]): string {
    const colors = ['primary', 'accent', 'warn', 'secondary'];
    let color = 0;
    for (let l of allLessons) {
      if (!this.classToColor.some(cc => cc.key === l.class)) {
        this.classToColor.push({
          key: l.class,
          value: `var(--teachu-${colors[color % colors.length]})`
        });
        color++;
      }
    }
    return this.classToColor.find(cc => cc.key === lesson.class)?.value ?? `var(--teachu-${colors[0]})`;
  }

  getFontColor(background: string): string {
    return (background === 'var(--teachu-primary)') ? 'var(--teachu-white)' : 'var(--teachu-black)';
  }

  openDetails(lesson: LessonDTO) {
    this.router.navigate([`${appRoutes.App}/${appRoutes.Timetable}/${lesson.lessonId}`])
  }
}
