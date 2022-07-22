import { UserExternalUserDTO } from "../User/UserExternalUserDTO";

export interface GradeDTO {
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
    grades: GradeGradeDTO[];
}

export interface GradeGradeDTO {
    name: string;
    description: string;
    date: Date;
    weight: number;
    mark: number;
}