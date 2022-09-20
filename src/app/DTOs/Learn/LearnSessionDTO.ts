export interface LearnSessionDTO {
    learnSessionId: string;
    created: string;
    ended: string | null;
    setId: string;
    setName: string;
    subjectMain: number;
    subjectSecond: number | null;
    numberOfRightAnswers: number;
    numberOfWrongAnswers: number;
    numberOfNotAnswerd: number;
}