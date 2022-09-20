import { GeneralQuestionQuestionDTO } from "../GeneralQuestion/GeneralQuestionQuestionDTO";

export interface TestQuestionSettingDTO {
  question: GeneralQuestionQuestionDTO;
  solution: string | null;
  pointsPossible: number;
  visible: boolean;
}