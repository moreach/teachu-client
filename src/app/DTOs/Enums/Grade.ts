import { KeyValue } from "@angular/common";

export type Grade = 'Grade1' | 'Grade2' | 'Grade3' | 'Grade4' | 'Grade5' | 'Grade6' | 'Grade7' | 'Grade8' | 'Grade9' | 'Grade10' | 'Grade11' | 'Grade12';

export function getGrades() {
    let grades: KeyValue<Grade, number>[] = [
        { key: 'Grade1', value: 1 },
        { key: 'Grade2', value: 2 },
        { key: 'Grade3', value: 3 },
        { key: 'Grade4', value: 4 },
        { key: 'Grade5', value: 5 },
        { key: 'Grade6', value: 6 },
        { key: 'Grade7', value: 7 },
        { key: 'Grade8', value: 8 },
        { key: 'Grade9', value: 9 },
        { key: 'Grade10', value: 10 },
        { key: 'Grade11', value: 11 },
        { key: 'Grade12', value: 12 }
    ];
    return grades;
}
