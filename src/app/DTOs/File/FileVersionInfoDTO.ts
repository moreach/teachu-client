import { FileFrontendDTO } from "./FileFrontendDTO";

export interface FileVersionInfoDTO {
    frontendFile: FileFrontendDTO;
    created: Date;
    createdBy: string;
}