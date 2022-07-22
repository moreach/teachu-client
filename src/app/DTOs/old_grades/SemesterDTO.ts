import {SchoolClassDTO} from "./SchoolClassDTO";

export interface SemesterDTO{
    semesterName: string;
    schoolClasses: SchoolClassDTO[];
}