import { DrawCanvasStoragePointDTO } from "./DrawCanvasStoragePointDTO";

export interface DrawCanvasStorageDTO {
    id: string;
    created: Date;
    deleted: Date | null;
    color: string;
    fromPosition: DrawCanvasStoragePointDTO;
    toPosition: DrawCanvasStoragePointDTO | null;
    text: string | null;
}