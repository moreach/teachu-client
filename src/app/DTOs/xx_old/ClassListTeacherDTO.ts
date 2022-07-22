import { Sex } from "./Enums/old_Sex";

export interface ClassListTeacherDTO {
    profileImage: string;
    firstName: string;
    lastName: string;
    sex: Sex;
    postalCode: string;
    city: string;
    street: string;
    phone: string;
}