import { UserExternalUserDTO } from "../User/UserExternalUserDTO";
import { ChatMessageResponseDTO } from "./ChatMessageResponseDTO";

export interface ChatResponseDTO {
    id: string;
    title: string;
    description: string;
    creator: UserExternalUserDTO;
    members: UserExternalUserDTO[];
    lastMessage: ChatMessageResponseDTO;
}