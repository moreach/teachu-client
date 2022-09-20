import { KeyValue } from "@angular/common";

export type ChallengeState = 'BeforeGame' | 'Question' | 'Answer' | 'Result' | 'Ended';

export function getChallengeStates() {
    let challengeState: KeyValue<ChallengeState, number>[] = [
        { key: 'BeforeGame', value: 1 },
        { key: 'Question', value: 2 },
        { key: 'Answer', value: 3 },
        { key: 'Result', value: 4 },
        { key: 'Ended', value: 5 }
    ];
    return challengeState;
}