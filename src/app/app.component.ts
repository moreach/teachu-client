import { Component } from '@angular/core';
import { LanguagesService } from './Languages/languages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'teachu';

  constructor (
    private languageService: LanguagesService,
  ) {
    this.languageService.setLanguageOnStartup();
  }
}
