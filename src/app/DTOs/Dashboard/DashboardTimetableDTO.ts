import { Weekday } from "../Enums/Weekday";

export interface DashboardTimetableDTO {
    date: Date;
    weekday: Weekday;
    userEvent: string | null;
    schoolEvent: string | null;
    schoolClassEvent: string | null;
    lessons: DashboardTimetableLessonDTO[];
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