import { KeyValue } from "@angular/common";

export type DrawGroupPolicy = 'OnlySelfEditable' | 'Public';

export function getDrawGroupPolicies() {
    let policies: KeyValue<DrawGroupPolicy, number>[] = [
        { key: 'OnlySelfEditable', value: 1 },
        { key: 'Public', value: 2 },
    ];
    return policies;
}