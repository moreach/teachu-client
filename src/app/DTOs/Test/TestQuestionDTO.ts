import { GeneralQuestionQuestionDTO } from "../GeneralQuestion/GeneralQuestionQuestionDTO";

export interface TestQuestionDTO {
  question: GeneralQuestionQuestionDTO;
  answer: string | null;
  maxPoints: number | null;
}