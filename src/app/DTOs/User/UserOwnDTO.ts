import { Language } from "src/app/DTOs/xx_old/Enums/old_Language";
import { Role } from "src/app/DTOs/xx_old/Enums/old_Role";
import { Sex } from "src/app/DTOs/xx_old/Enums/old_Sex";

export interface UserOwnDTO {
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: Sex;
    language: Language;
    darkTheme: boolean;
    city: string;
    postalCode: string;
    street: string;
    phone: string
}