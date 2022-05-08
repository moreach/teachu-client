import { KeyValue } from "@angular/common";

export type Sex = 'MALE' | 'FEMALE' | 'OTHER';

export const SEXS: KeyValue<string, Sex>[] = [
    { key: "sex_male", value: 'MALE' },
    { key: "sex_female", value: 'FEMALE' },
    { key: "sex_other", value: 'OTHER' }
];