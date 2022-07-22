import { Language } from "src/app/DTOs/xx_old/Enums/old_Language";

export interface UserOwnChangeDTO {
    language: Language;
    darkTheme: boolean;
    phone: string;
}