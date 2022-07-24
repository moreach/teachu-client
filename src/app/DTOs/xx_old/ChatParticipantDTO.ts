import { UserRole } from "../User/UserRole";

export interface ChatParticipantDTO {
    name: string | null; // null if is user self
    userId: string; // null if is user self
    image: string;
    role: UserRole;
    isAdmin: boolean;
}