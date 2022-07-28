import { Language } from "../Enums/Language";

export interface ChangeProfileDTO {
    language: Language;
    darkTheme: boolean;
    phone: string;
    profileImage: string;
}