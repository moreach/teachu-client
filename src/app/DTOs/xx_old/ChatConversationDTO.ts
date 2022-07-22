import { ChatConversationInfoDTO } from "./ChatConversationInfoDTO";
import { ChatMessageDTO } from "./ChatMessageDTO";

export interface ChatConversationDTO {
    info: ChatConversationInfoDTO;
    messages: ChatMessageDTO[];
}