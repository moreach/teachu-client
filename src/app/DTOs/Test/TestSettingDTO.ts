import { TestQuestionSettingDTO } from "./TestQuestionSettingDTO";

export interface TestSettingDTO {
  testId: string;
  name: string;
  setName: string;
  subjectMain: number;
  subjectSecond: number | null;
  maxTime: number;
  visible: boolean;
  active: boolean;
  questions: TestQuestionSettingDTO[];
}