import { UserSex } from "../User/UserSex";

export interface ClassListStudentDTO {
    profileImage: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: UserSex;
    postalCode: string;
    city: string;
    street: string;
    phone: string;
    nameParent1: string;
    phoneParent1: string;
    nameParent2: string;
    phoneParent2: string;
}