import { UserEventState } from "../Enums/UserEventState";
import { UserEventType } from "../Enums/UserEventType";

export interface DashboardAbsenceDTO {
    from: Date;
    to: Date;
    title: string;
    description: string;
    type: UserEventType;
    state: UserEventState;
}