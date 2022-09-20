import { KeyValue } from "@angular/common";

export type FilePolicy = 'Private' | 'OnlySelfEditable' | 'Everyone';

export function getFilePolicies() {
    let policies: KeyValue<FilePolicy, number>[] = [
        { key: 'Private', value: 1 },
        { key: 'OnlySelfEditable', value: 2 },
        { key: 'Everyone', value: 3 }
    ];
    return policies;
}