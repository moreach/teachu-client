import { TestQuestionResultDTO } from "./TestQuestionResultDTO";

export interface TestResultDTO {
  name: string;
  maxTime: number;
  timeUsed: number;
  subjectMain: number;
  subjectSecond: number | null;
  pointsScored: number;
  pointsPossible: number;
  questions: TestQuestionResultDTO[];
}