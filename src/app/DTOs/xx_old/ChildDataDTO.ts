import { UserSex } from "../User/UserSex";
import {GradeSemesterDTO} from "../Grade/GradeDTOs";

export interface ChildDataDTO {
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: UserSex;
    city: string;
    postalCode: string;
    street: string;
    phone: string;
    profileImage: string;
    marks: GradeSemesterDTO[];
}