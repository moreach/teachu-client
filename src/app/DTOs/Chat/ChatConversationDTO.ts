import { ChatMessageResponseDTO } from "./ChatMessageResponseDTO";
import { ChatResponseDTO } from "./ChatResponseDTO";

export interface ChatConversationDTO {
    info: ChatResponseDTO;
    messages: ChatMessageResponseDTO[];
}