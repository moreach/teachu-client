import { UserRole } from "../Enums/UserRole";
import { UserSex } from "../Enums/UserSex";

export interface ClassListDTO {
    name: string;
    classTeacher: ClassListTeacherDTO;
    students: ClassListStudentDTO[];
    teachers: ClassListTeacherDTO[];
}

export interface ClassListTeacherDTO {
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: UserSex;
    city: string;
    imageId: string;
}

export interface ClassListStudentDTO {
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: UserSex;
    city: string;
    imageId: string;
}