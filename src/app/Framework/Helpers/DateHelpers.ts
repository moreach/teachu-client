export function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes*60000);
}

export function isToday(date: Date): boolean {
    const today = new Date();
    return today.getDate() === date.getDate()
        && today.getMonth() === date.getMonth()
        && today.getFullYear() === date.getFullYear();
}

export function compareDates(date1: Date, date2: Date, strictGreater: boolean = false): boolean {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    if (strictGreater) {
        return d1 > d2;
    }
    return d1 >= d2;
}

export function equalDates(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.toDateString() === d2.toDateString();
}

export function getFirstDayOfWeek(date: Date) {
    return addDays(date, 1 - date.getDay());
}

export function getLastDayOfWeek(date: Date) {
    return addDays(date, 7 - date.getDay());
}

export function addDays(date: Date, days: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}