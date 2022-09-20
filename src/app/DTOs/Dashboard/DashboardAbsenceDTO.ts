import { UserEventState } from "../Enums/UserEventState";
import { UserEventType } from "../Enums/UserEventType";

export interface DashboardAbsenceDTO {
    from: number;
    to: number;
    title: string;
    description: string;
    type: UserEventType;
    state: UserEventState;
    navigate: string;
}