import { ChatType } from "./Enums/old_ChatType";

export interface ChatOverviewDTO {
    chatId: string;
    chatName: string;
    chatType: ChatType;
    chatImage: string;
    lastMessage: string;
    lastMessageFrom: string | null; // null -> from yourself
    lastMessageDate: Date;
}