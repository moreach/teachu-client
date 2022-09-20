export interface TestDTO {
  testId: string;
  testOfUserId: string | null;
  name: string;
  maxTime: number;
  subjectMain: number;
  subjectSecond: number | null;
  isGroupTest: boolean;
  isOwner: boolean;
  pointsScored: number | null;
  pointsPossible: number | null;
}