import { GeneralQuestionQuestionDTO } from "../GeneralQuestion/GeneralQuestionQuestionDTO";

export interface TestQuestionResultDTO {
  question: GeneralQuestionQuestionDTO;
  answer: string | null;
  solution: string | null;
  wasRight: boolean;
  pointsScored: number;
  pointsPossible: number;
}