import { UserRole } from "src/app/DTOs/User/UserRole";
import { UserSex } from "src/app/DTOs/User/UserSex";

export interface SchoolInfoDTO {
    title: string;
    message: string;
    important: boolean;
    pinned: boolean;
    date: Date;
    creator: SchoolInfoCreatorDTO;
    imageId: string;
}

export interface SchoolInfoCreatorDTO {
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: UserSex;
    city: string
}