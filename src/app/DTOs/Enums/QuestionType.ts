import { KeyValue } from "@angular/common";

export type QuestionType = 'Distribute' | 'Mathematic' | 'MultipleChoice' | 'OpenQuestion' | 'TextField' | 'TrueFalse' | 'Word';

export function getQuestionTypes() {
    let subjects: KeyValue<QuestionType, number>[] = [
        { key: 'Distribute', value: 1 },
        { key: 'Mathematic', value: 2 },
        { key: 'MultipleChoice', value: 3 },
        { key: 'OpenQuestion', value: 4 },
        { key: 'TextField', value: 5 },
        { key: 'TrueFalse', value: 6 },
        { key: 'Word', value: 7 }
    ];
    return subjects;
}