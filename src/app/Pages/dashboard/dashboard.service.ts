import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import { endpoints } from 'src/app/Config/endpoints';
import { AbsenceInfoDTO } from 'src/app/DTOs/Absence/AbsenceInfoDTO';
import { ClassListDTO } from 'src/app/DTOs/ClassList/ClassListDTO';
import { DashboardAbsenceDTO } from 'src/app/DTOs/Dashboard/DashboardAbsenceDTO';
import { DashboardChatDTO } from 'src/app/DTOs/Dashboard/DashboardChatDTO';
import { DashboardClassListDTO } from 'src/app/DTOs/Dashboard/DashboardClassListDTO';
import { DashboardGradeDTO } from 'src/app/DTOs/Dashboard/DashboardGradeDTO';
import { DashboardSchoolInfoDTO } from 'src/app/DTOs/Dashboard/DashboardSchoolInfoDTO';
import { DashboardTimetableDTO, DashboardTimetableLessonDTO } from 'src/app/DTOs/Dashboard/DashboardTimetableDTO';
import { GradeSemesterDTO } from 'src/app/DTOs/Grade/GradeDTOs';
import { SchoolInfoDTO } from 'src/app/DTOs/SchoolInfo/SchoolInfoDTO';
import { TimetableDayDTO } from 'src/app/DTOs/Timetable/TimetableDayDTO';
import { TimetableLayoutDTO } from 'src/app/DTOs/Timetable/TimetableLayoutDTO';
import { ApiService } from 'src/app/Framework/API/api.service';
import { truncateToMaxChars } from 'src/app/Framework/Helpers/StringHelpers';
import { ChatService } from '../chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private api: ApiService,
    private chatService: ChatService,
  ) { }

  getSchoolInfos$(): Observable<DashboardSchoolInfoDTO[]> {
    return this.api.callApi<SchoolInfoDTO[]>(endpoints.SchoolInfo, {}, 'GET').pipe(
      map(infos => {
        return infos.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);
      }),
      map(infos => {
        return infos.map(info => {
          return {
            title: info.title,
            message: truncateToMaxChars(info.message, 100),
            creator: info.creator.firstName + ' ' + info.creator.lastName,
            important: info.important,
            pinned: info.pinned,
            date: info.date,
            navigate: appRoutes.SchoolInfos,
          } as DashboardSchoolInfoDTO;
        });
      }),
    );
  }

  getTimetable$(): Observable<DashboardTimetableDTO> {
    const date = (new Date()).toISOString().split('T')[0];
    const value = {
      from: date,
      to: date,
    };
    const timetable$ = this.api.callApi<TimetableDayDTO[]>(endpoints.Timetable, value, 'GETwithPARAMS');
    const info$ = this.api.callApi<TimetableLayoutDTO[]>(endpoints.TimetableLayout, { }, 'GET');
    return combineLatest(
      timetable$,
      info$,
    ).pipe(
      map(([timetable, info]) => {
        return {
          timetable: timetable[0],
          info,
        }
      }),
      map(timetableInfo => {
        return {
          date: new Date(),
          weekday: timetableInfo.timetable.weekday,
          userEvent: !!timetableInfo.timetable.userEvent ? timetableInfo.timetable.userEvent.title : '',
          schoolEvent: !!timetableInfo.timetable.schoolEvent ? timetableInfo.timetable.schoolEvent.title : '',
          schoolClassEvent: !!timetableInfo.timetable.schoolClassEvent ? timetableInfo.timetable.schoolClassEvent.title : '',
          lessons: timetableInfo.timetable.lessons.map(lesson => {
            return {
              subject: lesson.subject,
              from: this.getFromToTimetable(lesson.timetableId, timetableInfo.info).from,
              to: this.getFromToTimetable(lesson.timetableId, timetableInfo.info).to,
              room: lesson.room,
              teacher: lesson.teacher.firstName + ' ' + lesson.teacher.lastName,
              schoolClass: lesson.schoolClass,
              lessonEvent: !!lesson.event ? lesson.event.title : '',
            } as DashboardTimetableLessonDTO;
          }),
          navigate: appRoutes.Timetable,
        } as DashboardTimetableDTO;
      }),
    );
  }

  getClassList$(): Observable<DashboardClassListDTO[]> {
    return this.api.callApi<ClassListDTO[]>(endpoints.ClassList, { }, 'GET').pipe(
      map(classlists => {
        return classlists.map(classlist => {
          return {
            className: classlist.name,
            classTeacher: classlist.classTeacher.firstName + ' ' + classlist.classTeacher.lastName,
            students: classlist.students.map(student => student.firstName + ' ' + student.lastName),
            teachers: classlist.teachers.map(teacher => teacher.firstName + ' ' + teacher.lastName),
            navigate: appRoutes.Classlist,
          } as DashboardClassListDTO;
        });
      })
    );
  }

  getGrades$(): Observable<DashboardGradeDTO[]> {
    return this.api.callApi<GradeSemesterDTO[]>(endpoints.Grade, {}, 'GET').pipe(
      map(semesters => semesters.flatMap(semester => semester.classes)),
      map(semesterClasses => semesterClasses.flatMap(semesterClass => semesterClass.subjects.map(subject => { return { ...subject, className: semesterClass.name }; }))),
      map(subjects => subjects.flatMap(subject => subject.grades.map(grade => { return { ...grade, subjectName: subject.name, className: subject.className }; }))),
      map(grades => {
        return grades.sort((a, b) => b.date - a.date).slice(0, 10);
      }),
      map(grades => {
        return grades.map(grade => {
          let epochDate = new Date(0);
          epochDate.setMilliseconds(grade.date);
          return {
            class: grade.className,
            date: epochDate,
            mark: grade.mark,
            description: grade.description,
            name: grade.name,
            subject: grade.subjectName,
            navigate: appRoutes.Grades,
          } as DashboardGradeDTO;
        });
      })
    );
  }

  getAbsences$(): Observable<DashboardAbsenceDTO[]> {
    return this.api.callApi<AbsenceInfoDTO[]>(endpoints.Absence, {}, 'GET').pipe(
      map(absences => {
        return absences.sort((a, b) => b.to.getTime() - a.to.getTime()).slice(0, 10);
      }),
      map(absences => {
        return absences.map(absence => {
          return {
            title: absence.title,
            from: absence.from,
            to: absence.to,
            description: absence.description,
            type: absence.type,
            state: absence.state,
            navigate: appRoutes.Absences,
          } as DashboardAbsenceDTO;
        });
      })
    );
  }

  getChat$(): Observable<DashboardChatDTO[]> {
    // todo implement from backend endpoint
    return this.chatService.getChatOverview$().pipe(
      map(chatOverview => {
        return chatOverview.sort((a, b) => b.lastMessageDate.getTime() - a.lastMessageDate.getTime()).slice(0, 10);
      }),
      map(chatOverview => {
        return chatOverview.map(chat => {
          return {
            chatImage: chat.chatImage,
            chatName: chat.chatName,
            chatType: chat.chatType,
            lastMessage: chat.lastMessage,
            lastMessageDate: chat.lastMessageDate,
            lastMessageFrom: chat.lastMessageFrom,
            navigate: [appRoutes.Chat, chat.chatId],
          } as DashboardChatDTO;
        });
      }),
    );
  }

  getFromToTimetable(timetableId: string, info: TimetableLayoutDTO[]) {
    const filtered = info.filter(x => x.timetableId === timetableId);
    if (filtered.length === 0) {
      return {
        from: '',
        to: '',
      };
    }
    return {
      from: filtered[0].start,
      to: filtered[0].end,
    };
  }
}