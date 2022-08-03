import { LessonEventType } from "../Enums/LessonEventType";
import { SchoolClassEventType } from "../Enums/SchoolClassEventType";
import { UserEventState } from "../Enums/UserEventState";
import { UserEventType } from "../Enums/UserEventType";
import { Weekday } from "../Enums/Weekday";
import { UserRole } from "../User/UserRole";
import { UserSex } from "../User/UserSex";

export interface TimetableDayDTO {
    date: Date;
    weekday: Weekday;
    userEvent: {
      from: Date;
      to: Date;
      title: string;
      description: string;
      type: UserEventType;
      state: UserEventState;
    };
    schoolEvent: {
      from: Date;
      to: Date;
      title: string;
      description: string;
      type: UserEventType;
    };
    lessons: [
      {
        schoolClass: string;
        subject: string;
        teacher: {
          email: string;
          role: UserRole;
          firstName: string;
          lastName: string;
          birthday: Date;
          sex: UserSex;
          city: string;
          imageId: string
        };
        timetableId: string;
        room: string;
        event: {
          title: string;
          description: string;
          type: LessonEventType;
        }
      }
    ];
    schoolClassEvent: {
      from: Date;
      to: Date;
      title: string;
      description: string;
      type: SchoolClassEventType;
    }
}