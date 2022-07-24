import { Language } from "./Enums/old_Language";
import { Role } from "./Enums/old_Role";
import { Sex } from "./Enums/old_Sex";

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
    imageId: string;
}
