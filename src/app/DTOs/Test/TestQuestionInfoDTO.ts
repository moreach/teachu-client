import { TestQuestionDTO } from "./TestQuestionDTO";

export interface TestQuestionInfoDTO {
    name: string;
    end: Date;
    questions: TestQuestionDTO[];
}