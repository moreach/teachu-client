import { CreateQuestionDistributeAnswerDTO } from "./createQuestionDistributeAnswerDTO";

export interface CreateQuestionDistributeDTO {
    id: string;
    question: string;
    answers: CreateQuestionDistributeAnswerDTO[];
}