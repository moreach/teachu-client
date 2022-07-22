import { Role } from "../Enums/old_Role";
import { Sex } from "../Enums/old_Sex";

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