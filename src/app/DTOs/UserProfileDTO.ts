import { Role } from "../Enums/Role";
import { Sex } from "../Enums/Sex";

export interface UserProfileDTO {
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: Sex;
    city: string;
    profileImage: string;
}