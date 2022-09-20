import { DrawCanvasStorageDTO } from "./DrawCanvasStorageDTO";

export interface DrawPageEditDTO {
    collectionId: string;
    pageId: string;
    dataUrl: string;
    canvasStorage: DrawCanvasStorageDTO[];
    stepperPosition: Date;
}