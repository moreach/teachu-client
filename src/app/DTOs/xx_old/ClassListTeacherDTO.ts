import { UserSex } from "../User/UserSex";

export interface ClassListTeacherDTO {
    profileImage: string;
    firstName: string;
    lastName: string;
    sex: UserSex;
    postalCode: string;
    city: string;
    street: string;
    phone: string;
}