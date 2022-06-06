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

  relevantDate: Date = new Date();

  constructor(
    private timetableService: TimetableService,
  ) { }

  getLessonsToday$(): Observable<LessonDTO[]> {
    return this.timetableService.getTimetable$(new Date(), new Date());
  }

  getLessonsWeek$(): Observable<LessonDTO[]> {
    return this.timetableService.getTimetable$(this.getStartDate(), this.getEndDate());
  }

  getStartDate(){
    return this.timetableService.getFirstDayOfWeek(this.relevantDate);
  }

  getEndDate(){
    return this.timetableService.getLastDayOfWeek(this.relevantDate);
  }  
}
