import {Sex} from "../Enums/Sex";
import {SemesterDTO} from "./grades/SemesterDTO";

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