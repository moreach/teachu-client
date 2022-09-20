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
import { UserExternalUserDTO } from 'src/app/DTOs/User/UserExternalUserDTO';
import { TokenService } from 'src/app/Framework/API/token.service';
import { isToday } from 'src/app/Framework/Helpers/DateHelpers';
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
    private tokenService: TokenService,
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

  toggleHidden(element: HTMLElement) {
    element.classList.toggle('hidden');
  }

  getHiddenIcon(element: HTMLElement) {
    return element.classList.contains('hidden') ? 'expand_more' : 'expand_less';
  }

  formatArray(array: string[]) {
    if (array.length === 0) {
      return '-';
    }
    return array.join(', ');
  }

  isToday(date: Date) {
    return isToday(date);
  }

  isDifferentDays(date1: Date, date2: Date) {
    new Date(date1).setHours(0, 0, 0, 0) !== new Date(date2).setHours(0, 0, 0, 0);
  }

  getProfileImage(members: UserExternalUserDTO[]) {
    if (!members) {
      return undefined;
    }
    if (members.length === 2) {
      return members.find(m => m.id !== this.tokenService.getUserId())?.imageId;
    }
    return undefined;
  }
}