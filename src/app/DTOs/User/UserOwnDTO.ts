import { Language } from "src/app/DTOs/Enums/Language";
import { UserRole } from "src/app/DTOs/User/UserRole";
import { UserSex } from "src/app/DTOs/User/UserSex";

export interface UserOwnDTO {
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: UserSex;
    language: Language;
    darkTheme: boolean;
    city: string;
    postalCode: string;
    street: string;
    phone: string;
    imageId: string;
    id: string;
}