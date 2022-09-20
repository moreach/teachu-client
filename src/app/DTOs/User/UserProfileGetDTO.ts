import { FileFrontendDTO } from "../File/FileFrontendDTO";

export interface UserProfileGetDTO {
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  grade: number;
  profileImage: FileFrontendDTO;
  information: string;
  language: number;
  goodSubject1: number;
  goodSubject2: number;
  goodSubject3: number;
  badSubject1: number;
  badSubject2: number;
  badSubject3: number;
  darkTheme: boolean;
}