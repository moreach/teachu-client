import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { TimetableDayDTO } from 'src/app/DTOs/Timetable/TimetableDayDTO';
import { TimetableLayoutDTO } from 'src/app/DTOs/Timetable/TimetableLayoutDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { compareDates } from 'src/app/Framework/Helpers/DateHelpers';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(
    private api: ApiService,
  ) { }

  getTimetable$(from: Date, to: Date): Observable<TimetableDayDTO[]> {
    const fromFormatted = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`;
    const toFormatted = `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`;
    const value = {
      from: fromFormatted,
      to: toFormatted,
    };
    return this.api.callApi<TimetableDayDTO[]>(endpoints.Timetable, value, 'GET');
  }

  getLessonInfo$(): Observable<TimetableLayoutDTO[]> {
    return this.api.callApi<TimetableLayoutDTO[]>(endpoints.TimetableLayout, { }, 'GET');
  }
}
