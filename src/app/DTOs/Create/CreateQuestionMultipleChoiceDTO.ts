import { CreateQuestionMultipleChoiceAnswerDTO } from "./createQuestionMultipleChoiceAnswerDTO";

export interface CreateQuestionMultipleChoiceDTO {
    id: string;
    question: string;
    answers: CreateQuestionMultipleChoiceAnswerDTO[];
}