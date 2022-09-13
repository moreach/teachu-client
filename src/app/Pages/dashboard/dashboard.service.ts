import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/Config/endpoints';
import { ClassListDTO } from 'src/app/DTOs/ClassList/ClassListDTO';
import { GradeSemesterDTO } from 'src/app/DTOs/Grade/GradeDTOs';
import { SchoolInfoDTO } from 'src/app/DTOs/SchoolInfo/SchoolInfoDTO';
import { TimetableDayDTO } from 'src/app/DTOs/Timetable/TimetableDayDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { ChatService } from '../chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private api: ApiService,
    private chatService: ChatService,
  ) { }

  getSchoolInfos$() {
    return this.api.callApi<SchoolInfoDTO[]>(endpoints.SchoolInfo, {}, 'GET');
  }

  getTimetable$() {
    const date = (new Date()).toISOString().split('T')[0];
    const value = {
      from: date,
      to: date,
    };
    return this.api.callApi<TimetableDayDTO[]>(endpoints.Timetable, value, 'GETwithPARAMS');
  }

  getClassList$() {
    return this.api.callApi<ClassListDTO[]>(endpoints.ClassList, { }, 'GET');
  }

  getGrades$() {
    this.api.callApi<GradeSemesterDTO[]>(endpoints.Grade, {}, 'GET');
  }

  getAbsences$() {

  }

  getChat$() {
    // todo implement from backend endpoint
    return this.chatService.getChatOverview$();
  }
}