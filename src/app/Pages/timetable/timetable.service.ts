import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LessonDTO } from 'src/app/DTOs/xx_old/LessonDTO';
import { LessonInfoDTO } from 'src/app/DTOs/xx_old/LessonInfoDTO';
import { compareDates } from 'src/app/Framework/Helpers/DateHelpers';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor() { }

  getTimetable$(from: Date, to: Date): Observable<LessonDTO[]> {
    // todo implement enpoint from backend
    const mockData = [
      {
        class: 'B1a',
        subject: 'Mathematik',
        lessonNumber: 1,
        room: 'O11',
        date: new Date(),
        teacher: 'M. Plaukovits',
        lessonId: '1',
      },
      {
        class: 'B2a',
        subject: 'Mathematik',
        lessonNumber: 2,
        room: 'O11',
        date: new Date(),
        teacher: 'M. Plaukovits',
        lessonId: '2',
      },
      {
        class: 'B3a',
        subject: 'Mathematik',
        lessonNumber: 3,
        room: 'O11',
        date: new Date(),
        teacher: 'M. Plaukovits',
        lessonId: '3',
      },
      {
        class: 'B4a',
        subject: 'Deutsch',
        lessonNumber: 4,
        room: 'O12',
        date: new Date(),
        teacher: 'M. Hehlen',
        lessonId: '4',
      },
      {
        class: 'B3a',
        subject: 'Französisch',
        lessonNumber: 5,
        room: 'O12',
        date: new Date(),
        teacher: 'D. Kamber',
        lessonId: '5',
      },
      {
        class: 'B3a',
        subject: 'Französisch',
        lessonNumber: 6,
        room: 'O12',
        date: new Date(),
        teacher: 'D. Kamber',
        lessonId: '6',
      },
      {
        class: 'Freifach Gruppe 1',
        subject: 'Italienisch',
        lessonNumber: 7,
        room: 'O12',
        date: new Date(),
        teacher: 'C. Notter',
        lessonId: '7',
      },
      {
        class: 'Freifach Gruppe 1',
        subject: 'Italienisch',
        lessonNumber: 8,
        room: 'O12',
        date: new Date(),
        teacher: 'C. Notter',
        lessonId: '8',
      },
    ] as LessonDTO[];
    const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const end = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59);
    const filtered = mockData.filter(l => compareDates(l.date, start) && compareDates(end, l.date));
    return of(filtered);
  }

  getLessonInfo$(): Observable<LessonInfoDTO[]> {
    // todo implement enpoint from backend
    const mockData = [
      {
        lessonNumber: 1,
        start: '8:00',
        end: '9:00'
      },
      {
        lessonNumber: 2,
        start: '9:00',
        end: '10:00'
      },
      {
        lessonNumber: 3,
        start: '10:00',
        end: '11:00'
      },
      {
        lessonNumber: 4,
        start: '11:00',
        end: '12:00'
      },
      {
        lessonNumber: 5,
        start: '13:00',
        end: '14:00'
      },
      {
        lessonNumber: 6,
        start: '14:00',
        end: '15:00'
      },
      {
        lessonNumber: 7,
        start: '15:00',
        end: '16:00'
      },
      {
        lessonNumber: 8,
        start: '16:00',
        end: '17:00'
      },
    ];
    return of(mockData);
  }

  getLessonDetails$(lessonId: string): Observable<string> {
    // todo implement enpoint from backend
    return of('Lesson details');
  }
}
