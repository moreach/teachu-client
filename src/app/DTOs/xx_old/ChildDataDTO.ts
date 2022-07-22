import { SemesterDTO } from "../old_grades/SemesterDTO";
import { Sex } from "./Enums/old_Sex";

export interface ChildDataDTO {
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: Sex;
    city: string;
    postalCode: string;
    street: string;
    phone: string;
    profileImage: string;
    marks: SemesterDTO[];
}