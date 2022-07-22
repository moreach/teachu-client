import { Role } from "src/app/DTOs/xx_old/Enums/old_Role";
import { Sex } from "src/app/DTOs/xx_old/Enums/old_Sex";

export interface SchoolInfoDTO {
    title: string;
    message: string;
    important: boolean;
    pinned: boolean;
    date: Date;
    creator: SchoolInfoCreatorDTO;
}

export interface SchoolInfoCreatorDTO {
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: Sex;
    city: string
}