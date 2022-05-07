import { Component } from '@angular/core';
import { LanguagesService } from './languages.service';

@Component({
  selector: 'app-language-lookup',
  templateUrl: './language-lookup.component.html',
  styleUrls: ['./language-lookup.component.scss']
})
export class LanguageLookupComponent {

  constructor (
    private languageService: LanguagesService,
  ) {
    this.languageService.setLanguageOnStartup();
  }

  allLanguages() {
    return this.languageService.allLanguages();
  }

  selectedLanguage() {
    return this.languageService.getSelectedLanguage();
  }

  selectLanguage(language: string) {
    this.languageService.selectLanguage(language);
  }

  isLanguageDisabled(language: string) {
    return this.languageService.selectableLanguages().filter(l => l.key === language).length === 0;
  }

}
