import {Component} from '@angular/core';
import {LanguagesService} from './Framework/Languages/languages.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'TeachU';

    constructor(
        private languageService: LanguagesService,
    ) {
        this.languageService.setLanguageOnStartup();
    }
}
