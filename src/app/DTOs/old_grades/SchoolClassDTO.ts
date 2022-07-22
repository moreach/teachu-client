import {SubjectDTO} from "./SubjectDTO";


export interface SchoolClassDTO{
    schoolClass: string;
    teacherFirstName: string;
    teacherLastName: string;
    averageMark: number;
    subjects: SubjectDTO[];
}