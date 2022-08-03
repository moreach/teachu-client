import { ClassListTeacherDTO } from "../ClassList/ClassListDTO";
import { LessonEventType } from "../Enums/LessonEventType";
import { SchoolClassEventType } from "../Enums/SchoolClassEventType";
import { UserEventState } from "../Enums/UserEventState";
import { UserEventType } from "../Enums/UserEventType";
import { Weekday } from "../Enums/Weekday";

export interface TimetableDayDTO {
  date: Date;
  weekday: Weekday;
  userEvent: TimetableUserEventDTO;
  schoolEvent: TimetableSchoolEventDTO;
  lessons: TimetableLessonDTO[];
  schoolClassEvent: TimetableSchoolClassEventDTO;
}

export interface TimetableUserEventDTO {
  from: Date;
  to: Date;
  title: string;
  description: string;
  type: UserEventType;
  state: UserEventState;
}

export interface TimetableSchoolEventDTO {
  from: Date;
  to: Date;
  title: string;
  description: string;
  type: UserEventType;
}

export interface TimetableLessonDTO {
  schoolClass: string;
  subject: string;
  teacher: ClassListTeacherDTO;
  timetableId: string;
  room: string;
  event: TimetableLessonEventDTO;
}

export interface TimetableLessonEventDTO {
  title: string;
  description: string;
  type: LessonEventType;
}

export interface TimetableSchoolClassEventDTO {
  from: Date;
  to: Date;
  title: string;
  description: string;
  type: SchoolClassEventType;
}