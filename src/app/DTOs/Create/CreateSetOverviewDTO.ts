export interface CreateSetOverviewDTO {
  setId: string;
  name: string;
  description: string;
  subjectMain: number;
  subjectSecond: number | null;
  numberOfQuestions: number;
  owner: string;
  usable: boolean;
  editable: boolean;
  policyEditable: boolean;
}