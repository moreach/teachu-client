import { Role } from "../Enums/Role";

export interface ChatParticipantDTO {
    name: string | null; // null if is user self
    userId: string; // null if is user self
    image: string;
    role: Role;
    isAdmin: boolean;
}