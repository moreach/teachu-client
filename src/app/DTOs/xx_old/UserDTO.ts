import { Language } from "./Enums/old_Language";
import { UserRole } from "../User/UserRole";
import { UserSex } from "../User/UserSex";

export interface UserDTO {
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
}
