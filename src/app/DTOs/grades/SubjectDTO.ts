import {GradeDTO} from "./GradeDTO";

export interface SubjectDTO {
    subjectName: string;
    teacherFirstName: string;
    teacherLastName: string;
    averageMark: number;
    grades: GradeDTO[];
}