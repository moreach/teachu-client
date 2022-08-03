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