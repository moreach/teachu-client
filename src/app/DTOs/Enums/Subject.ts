import { KeyValue } from "@angular/common";

export type Subject = 'Mathematics' | 'Physics' | 'Biology' | 'Chemistry' | 'History' | 'Geography' | 'German' | 'French' | 'English' | 'Italian' | 'Latin' | 'Music' | 'Sport' | 'Drawing';

export function getSubjects() {
    let subjects: KeyValue<Subject, number>[] = [
        { key: 'Mathematics', value: 1 },
        { key: 'Physics', value: 2 },
        { key: 'Biology', value: 3 },
        { key: 'Chemistry', value: 4 },
        { key: 'History', value: 5 },
        { key: 'Geography', value: 6 },
        { key: 'German', value: 7 },
        { key: 'French', value: 8 },
        { key: 'English', value: 9 },
        { key: 'Italian', value: 10 },
        { key: 'Latin', value: 11 },
        { key: 'Music', value: 12 },
        { key: 'Sport', value: 13 },
        { key: 'Drawing', value: 14 }
    ];
    return subjects;
}