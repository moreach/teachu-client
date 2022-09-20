import { GroupMessageGetDTO } from "./GroupMessageGetDTO";

export interface GroupMessageChatDTO {
    groupName: string;
    profileImagePath: string;
    messages: GroupMessageGetDTO[];
}