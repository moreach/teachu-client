import { GeneralQuestionQuestionDTO } from "../GeneralQuestion/GeneralQuestionQuestionDTO";

export interface LearnQuestionDTO {
    question: GeneralQuestionQuestionDTO;
    answered: boolean;
    answeredCorrect: boolean | null;
    answerByUser: string | null;
    markedAsHard: boolean;
    solution: string | null;
}