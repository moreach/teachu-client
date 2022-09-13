import { UserExternalUserDTO } from "../User/UserExternalUserDTO";

export interface GradeSemesterDTO {
    id: string;
    name: string;
    from: Date;
    to: Date;
    classes: GradeClassDTO[];
}

export interface GradeClassDTO {
    id: string;
    name: string;
    classTeacher: UserExternalUserDTO;
    average: number;
    subjects: GradeSubjectDTO[];
}

export interface GradeSubjectDTO {
    id: string;
    name: string;
    classTeacher: UserExternalUserDTO;
    average: number;
    grades: GradeDTO[];
}

export interface GradeDTO {
    name: string;
    description: string;
    date: number;
    weight: number;
    mark: number;
}

export interface SubjectData {
    semester: GradeSemesterDTO;
    schoolClass: GradeClassDTO;
    subject: GradeSubjectDTO;
}