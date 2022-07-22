import { Role } from "src/app/DTOs/xx_old/Enums/old_Role";
import { Sex } from "src/app/DTOs/xx_old/Enums/old_Sex";

export interface UserExternalUserDTO {
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: Sex;
    city: string
}