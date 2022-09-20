import { DrawPageGetDTO } from "./DrawPageGetDTO";

export interface DrawDrawingDTO {
    pages: DrawPageGetDTO[];
    name: string;
    editable: boolean;
    changedBy: string | null;
}