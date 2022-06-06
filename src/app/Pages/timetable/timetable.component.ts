import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LessonDTO } from 'src/app/DTOs/LessonDTO';
import { TimetableService } from './timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent {

  constructor(
    private timetableService: TimetableService,
  ) { }

  getLessonsToday$(): Observable<LessonDTO[]> {
    return this.timetableService.getTimetable$(new Date(), new Date());
  }

  getLessonsWeek$(relevantDate: Date): Observable<LessonDTO[]> {
    const firstDayOfWeek = this.timetableService.getFirstDayOfWeek(relevantDate);
    const lastDayOfWeek = this.timetableService.getLastDayOfWeek(relevantDate);
    return this.timetableService.getTimetable$(firstDayOfWeek, lastDayOfWeek);
  }
}
