export function truncateToMaxChars(text: string, charCount: number): string {
    let trimmedString = text.substr(0, charCount);
    if (trimmedString === text) {
        return text;
    }
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...';
    return trimmedString;
}

export function removeEmptyAndSpecialChars(text: string): string {
    return text.replace(/[^a-zA-Z0-9]/g, '');
}

export function formatTime(minutes: number) {
    if (!minutes) {
        return 0 + '\'';
    }
    if (minutes >= 60) {
        return Math.floor(minutes / 60) + 'h ' + (minutes % 60) + '\'';
    }
    return minutes + '\'';
}