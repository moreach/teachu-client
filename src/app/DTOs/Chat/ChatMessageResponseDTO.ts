import { ChatMessageReadState } from "../Enums/ChatMessageReadState";
import { UserExternalUserDTO } from "../User/UserExternalUserDTO";

export interface ChatMessageResponseDTO {
    message: string;
    user: UserExternalUserDTO;
    timestamp: number;
    chatState: ChatMessageReadState;
}