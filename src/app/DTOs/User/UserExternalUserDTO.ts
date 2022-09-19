import { UserRole } from "src/app/DTOs/User/UserRole";
import { UserSex } from "src/app/DTOs/User/UserSex";

export interface UserExternalUserDTO {
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: UserSex;
    city: string;
    imageId: string;
    id: string;
}