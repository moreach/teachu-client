import { DrawCanvasStorageDTO } from "./DrawCanvasStorageDTO";

export interface DrawCanvasSegmentsWrapperDTO {
    segments: DrawCanvasStorageDTO[];
    stepperPosition: Date;
}