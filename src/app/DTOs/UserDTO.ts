import { Language } from "../Enums/Language";
import { Role } from "../Enums/Role";
import { Sex } from "../Enums/Sex";

export interface UserDTO {
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
    phone: string;
    profileImage: string;
}
