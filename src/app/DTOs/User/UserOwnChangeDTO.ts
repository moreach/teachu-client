import { Language } from "src/app/DTOs/Enums/Language";

export interface UserOwnChangeDTO {
    language: Language;
    darkTheme: boolean;
    phone: string;
}