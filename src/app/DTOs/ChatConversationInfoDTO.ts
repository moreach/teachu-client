import { ChatType } from "../Enums/ChatType";
import { ChatParticipantDTO } from "./ChatParticipantDTO";

export interface ChatConversationInfoDTO {
    chatName: string;
    chatType: ChatType;
    chatImage: string;
    participants: ChatParticipantDTO[];
    isUserAdmin: boolean;
}