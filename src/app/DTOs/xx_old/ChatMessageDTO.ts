export interface ChatMessageDTO {
    message: string;
    sender: string | null; // null -> from yourself
    timestamp: Date;
    isInfoOnly: boolean;
}