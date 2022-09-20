import { Weekday } from "../Enums/Weekday";

export interface DashboardTimetableDTO {
    date: Date;
    weekday: Weekday;
    events: string[];
    lessons: DashboardTimetableLessonDTO[];
    navigate: string;
}

export interface DashboardTimetableLessonDTO {
    from: string;
    to: string;
    schoolClass: string;
    subject: string;
    teacher: string;
    room: string;
    lessonEvent: string;
}