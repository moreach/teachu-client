export interface UserProfileUploadDTO {
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  grade: number;
  profileImagePath: string;
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