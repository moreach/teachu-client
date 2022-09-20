export interface ChallengeOpenDTO {
    challengeId: string;
    name: string;
    createSetName: string;
    subjectMain: number;
    subjectSecond: number | null;
    numberOfPlayers: number;
    isOwner: boolean;
}