import { KeyValue } from "@angular/common";

export type Language = 'german' | 'english' | 'french';

export const languages: KeyValue<string, string>[] = [
    { key: 'en-GB', value: 'languages.english' },
    { key: 'ar-SA', value: 'languages.arabic' },
    { key: 'zh-CN', value: 'languages.chinese' },
    { key: 'da-DK', value: 'languages.danish' },
    { key: 'nl-NL', value: 'languages.dutch' },
    { key: 'fi-FI', value: 'languages.finnish' },
    { key: 'fr-FR', value: 'languages.french' },
    { key: 'de-DE', value: 'languages.german' },
    { key: 'hi-IN', value: 'languages.hindi' },
    { key: 'it-IT', value: 'languages.italian' },
    { key: 'ja-JP', value: 'languages.japanese' },
    { key: 'ko-KR', value: 'languages.korean' },
    { key: 'pl-PL', value: 'languages.polish' },
    { key: 'pt-PT', value: 'languages.portuguese' },
    { key: 'ru-RU', value: 'languages.russian' },
    { key: 'es-ES', value: 'languages.spanish' },
    { key: 'sv-SE', value: 'languages.swedish' },
    { key: 'th-TH', value: 'languages.thai' },
    { key: 'tr-TR', value: 'languages.turkish' },
    { key: 'vi-VN', value: 'languages.vietnamese' },
];

const languageMapping: KeyValue<string, Language>[] = [
    { key: 'en-GB', value: 'english' },
    { key: 'de-DE', value: 'german' },
    { key: 'fr-FR', value: 'french' },
];

export function GetLanguage(language: string): Language {
    return languageMapping.filter(l => l.key === language)[0].value;
}

export function GetLanguageKey(language: Language): string {
    return languageMapping.filter(l => l.value === language)[0].key;
}