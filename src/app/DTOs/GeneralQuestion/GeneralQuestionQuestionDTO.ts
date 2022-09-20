import { ChallengeQuestionAnswerDTO } from "../Challenge/ChallengeQuestionAnswerDTO";

export interface GeneralQuestionQuestionDTO {
    question: string;
    questionId: string;
    description: string | null;
    questionType: number;
    answerSetOne: ChallengeQuestionAnswerDTO[] | null;
    answerSetTwo: ChallengeQuestionAnswerDTO[] | null;
}