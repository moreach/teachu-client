import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languages } from 'src/app/DTOs/Enums/Language';
import { TokenService } from '../API/token.service';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor (
    private tokenService: TokenService,
    private translateService: TranslateService,
  ) { }

  setLanguageOnStartup() {
    if (!this.translateService.currentLang) {
      const tokenLang = this.sanitizeLanguage(this.tokenService.getSelectedLanguage());
      const browserLang = this.sanitizeLanguage(this.translateService.getBrowserLang());
      if (!!tokenLang && !this.translateService.currentLang) {
        this.translateService.use(tokenLang);
      } else if (!!browserLang && !this.translateService.currentLang) {
        this.translateService.use(browserLang);
      } else {
        this.translateService.use(this.translateService.defaultLang);
      }
    }
  }

  sanitizeLanguage(language: string | null | undefined): string | null {
    if (!language) {
      return null;
    }
    if (this.selectableLanguages().filter(l => l.key === language).length > 0) {
      return language;
    }
    if (language.length === 2 && this.selectableLanguages().map(l => l.key.slice(0, 2)).filter(l => l === language).length > 0) {
      return languages.filter(l => l.key.slice(0, 2) === language)[0].key;
    }
    return null;
  }

  selectLanguage(language: string) {
    this.translateService.use(language);
    this.tokenService.setSelectedLanguage(language);
  }

  selectableLanguages() {
    // todo translate manually with excel helper to languages in json files
    return languages.filter(l => l.key === 'en-GB' || l.key === 'de-DE' || l.key === 'fr-FR');
  }

  getSelectedLanguage(): string {
    return this.translateService.currentLang ?? this.translateService.defaultLang;
  }

  allLanguages() {
    return languages;
  }
}