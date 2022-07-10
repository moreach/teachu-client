import { ClassListStudentDTO } from "./ClassListStudentDTO";

export interface ClassListClassDTO {
    className: string;
    teacherName: string;
    students: ClassListStudentDTO[];
}