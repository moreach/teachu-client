import { ClassListClassDTO } from "./ClassListClassDTO";
import { ClassListTeacherDTO } from "./ClassListTeacherDTO";

export interface ClassListDTO {
    classes: ClassListClassDTO[];
    teachers: ClassListTeacherDTO[];
}