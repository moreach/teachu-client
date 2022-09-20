import { TogetherChatMessageDTO } from "./TogetherChatMessageDTO";
import { TogetherUserProfileDTO } from "./TogetherUserProfileDTO";

export interface TogetherChatDTO {
  messages: TogetherChatMessageDTO[];
  user: TogetherUserProfileDTO;
}