import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { DashboardAbsenceDTO } from 'src/app/DTOs/Dashboard/DashboardAbsenceDTO';
import { DashboardChatDTO } from 'src/app/DTOs/Dashboard/DashboardChatDTO';
import { DashboardClassListDTO } from 'src/app/DTOs/Dashboard/DashboardClassListDTO';
import { DashboardGradeDTO } from 'src/app/DTOs/Dashboard/DashboardGradeDTO';
import { DashboardSchoolInfoDTO } from 'src/app/DTOs/Dashboard/DashboardSchoolInfoDTO';
import { DashboardTimetableDTO } from 'src/app/DTOs/Dashboard/DashboardTimetableDTO';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  schoolInfos$: Observable<DashboardSchoolInfoDTO[]>;
  timetable$: Observable<DashboardTimetableDTO>;
  classList$: Observable<DashboardClassListDTO[]>;
  grades$: Observable<DashboardGradeDTO[]>;
  absences$: Observable<DashboardAbsenceDTO[]>;
  chat$: Observable<DashboardChatDTO[]>;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
  ) {
    this.schoolInfos$ = this.dashboardService.getSchoolInfos$();
    this.timetable$ = this.dashboardService.getTimetable$();
    this.classList$ = this.dashboardService.getClassList$();
    this.grades$ = this.dashboardService.getGrades$();
    this.absences$ = this.dashboardService.getAbsences$();
    this.chat$ = this.dashboardService.getChat$();
  }

  navigate(navigate: string | string[]) {
    if (typeof navigate === 'string') {
      this.router.navigate([appRoutes.App, navigate]);
    } else {
      this.router.navigate([appRoutes.App, ...navigate]);
    }
  }

  isEmpty(array: any[]) {
    return array.length === 0;
  }
}