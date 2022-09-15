import { ChatType } from "../Enums/ChatType";

export interface DashboardChatDTO {
    chatName: string;
    chatType: ChatType;
    chatImage: string;
    lastMessage: string;
    lastMessageFrom: string | null;
    lastMessageDate: Date;
    navigate: string[];
}