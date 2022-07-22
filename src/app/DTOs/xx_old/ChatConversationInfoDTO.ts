import { ChatParticipantDTO } from "./ChatParticipantDTO";
import { ChatType } from "./Enums/old_ChatType";

export interface ChatConversationInfoDTO {
    chatName: string;
    chatType: ChatType;
    chatImage: string;
    participants: ChatParticipantDTO[];
    isUserAdmin: boolean;
}