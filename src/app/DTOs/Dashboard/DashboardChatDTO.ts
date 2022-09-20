import { ChatType } from "../Enums/ChatType";
import { UserExternalUserDTO } from "../User/UserExternalUserDTO";

export interface DashboardChatDTO {
    chatName: string;
    chatType: ChatType;
    chatImage: string;
    lastMessage: string;
    lastMessageFrom: string | null;
    lastMessageDate: Date;
    members: UserExternalUserDTO[];
    navigate: string[];
}