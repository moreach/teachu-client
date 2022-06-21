import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss']
})
export class LessonDetailsComponent {

  lessonDetails$: Observable<string>;

  constructor(
    private timetableService: TimetableService,
    private activatedRoute: ActivatedRoute,
  ) {
    const lessonId = this.activatedRoute.snapshot.paramMap.get(appRoutes.LessonId) ?? '';
    this.lessonDetails$ = this.timetableService.getLessonDetails$(lessonId);
  }
}
