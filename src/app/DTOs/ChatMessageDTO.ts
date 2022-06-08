export interface ChatMessageDTO {
    message: string;
    sender: string | null; // null -> from yourself
    date: Date;
    isInfoOnly: boolean;
}