import { TestSettingsSaveQuestionDTO } from "./TestSettingsSaveQuestionDTO";

export interface TestSaveSettingsDTO {
  testId: string;
  name: string;
  maxTime: number;
  visible: boolean;
  active: boolean;
  questions: TestSettingsSaveQuestionDTO[];
}