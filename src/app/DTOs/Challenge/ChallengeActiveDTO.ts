import { GeneralQuestionQuestionDTO } from "../GeneralQuestion/GeneralQuestionQuestionDTO";
import { ChallengePlayerResultDTO } from "./ChallengePlayerResultDTO";

export interface ChallengeActiveDTO {
    name: string;
    result: ChallengePlayerResultDTO[];
    cancelled: boolean;
    isOwner: boolean;
    question: GeneralQuestionQuestionDTO | null;
    lastQuestionPoint: number | null;
    lastQuestionCorrectAnswer: string | null;
    state: number;
    questionCloses: Date | null;
}