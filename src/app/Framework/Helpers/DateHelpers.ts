export function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes*60000);
}

export function isToday(date: Date): boolean {
    const today = new Date();
    return today.getDate() === date.getDate()
        && today.getMonth() === date.getMonth()
        && today.getFullYear() === date.getFullYear();
}