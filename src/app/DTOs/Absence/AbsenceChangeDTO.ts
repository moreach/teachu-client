import { UserEventType } from "../Enums/UserEventType";

export interface AbsenceChangeDTO {
    from: Date;
    to: Date;
    title: string;
    description: string;
    type: UserEventType;
}