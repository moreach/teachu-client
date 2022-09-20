import { CreateQuestionMathematicVariableDTO } from "./CreateQuestionMathematicVariableDTO";

export interface CreateQuestionMathematicDTO {
    id: string;
    question: string;
    answer: string;
    digits: number;
    variables: CreateQuestionMathematicVariableDTO[];
}