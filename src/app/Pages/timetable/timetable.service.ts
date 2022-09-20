import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/Config/endpoints';
import { TimetableDayDTO } from 'src/app/DTOs/Timetable/TimetableDayDTO';
import { TimetableLayoutDTO } from 'src/app/DTOs/Timetable/TimetableLayoutDTO';
import { ApiService } from 'src/app/Framework/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(
    private api: ApiService,
  ) { }

  getTimetable$(from: Date, to: Date): Observable<TimetableDayDTO[]> {
    const value = {
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0],
    };
    return this.api.callApi<TimetableDayDTO[]>(endpoints.Timetable, value, 'GETwithPARAMS');
  }

  getLessonInfo$(): Observable<TimetableLayoutDTO[]> {
    return this.api.callApi<TimetableLayoutDTO[]>(endpoints.TimetableLayout, { }, 'GET');
  }
}
