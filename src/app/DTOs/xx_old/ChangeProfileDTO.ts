import { Language } from "./Enums/old_Language";

export interface ChangeProfileDTO {
    language: Language;
    darkTheme: boolean;
    phone: string;
    profileImage: string;
}