export interface TogetherOverviewUserProfileDTO {
  userId: string;
  username: string;
  grade: number;
  profileImagePath: string;
  information: string;
  goodSubject1: number;
  goodSubject2: number;
  goodSubject3: number;
  badSubject1: number;
  badSubject2: number;
  badSubject3: number;
  lastMessageSentByMe: boolean | null;
  lastMessage: string | null;
  lastMessageDateSent: Date | null;
}