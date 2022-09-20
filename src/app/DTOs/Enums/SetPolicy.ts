import { KeyValue } from "@angular/common";

export type SetPolicy = 'Private' | 'OnlySelfEditable' | 'Everyone';

export function getSetPolicies() {
    let subjects: KeyValue<SetPolicy, number>[] = [
        { key: 'Private', value: 1 },
        { key: 'OnlySelfEditable', value: 2 },
        { key: 'Everyone', value: 3 }
    ];
    return subjects;
}