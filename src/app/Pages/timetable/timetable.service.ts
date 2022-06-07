import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LessonDTO } from 'src/app/DTOs/LessonDTO';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor() { }

  getTimetable$(from: Date, to: Date): Observable<LessonDTO[]> {
    // todo implement enpoint from backend
    return of([
      {
        class: 'IN19a',
        subject: 'Sport',
        room: 'Halle 1',
        teacher: 'W. Kozlowski',
        start: new Date(2022, 5, 14, 8, 35),
        end: new Date(2022, 5, 14, 9, 35)
      } as LessonDTO,
      {
        class: 'IN19a',
        subject: 'Informatik',
        room: 'B426',
        teacher: 'M. Bachofner',
        start: new Date(2022, 5, 14, 10, 0),
        end: new Date(2022, 5, 14, 12, 0)
      } as LessonDTO,
      {
        class: 'IN19a',
        subject: 'Informatik',
        room: 'B426',
        teacher: 'M. Bachofner',
        start: new Date(2022, 5, 14, 13, 0),
        end: new Date(2022, 5, 14, 17, 10)
      } as LessonDTO,
      {
        class: 'BM19c',
        subject: 'Wirtschaft & Recht',
        teacher: 'S. Bonaparter',
        room: 'M3xx',
        start: new Date(2022, 5, 15, 7, 30),
        end: new Date(2022, 5, 15, 9, 5)
      } as LessonDTO,
    ])
  }

  getFirstDayOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  getLastDayOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff + 6));
  }
}
