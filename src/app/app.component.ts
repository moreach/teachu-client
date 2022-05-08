import {Component, HostListener} from '@angular/core';
import {LanguagesService} from './Framework/Languages/languages.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'TeachU';
    bigWindow: boolean = false;
    menuClosed: boolean = false;

    constructor(
        private languageService: LanguagesService,
    )  {
        this.onResize();
        this.languageService.setLanguageOnStartup();
    }

    @HostListener("window:resize", [])
    onResize() {
        let oldBigWindow = this.bigWindow;
        this.bigWindow = window.innerWidth > 1000;
        if(!this.menuClosed && window.innerWidth < 1000)
            this.menuClosed = true;

        if(this.bigWindow && !oldBigWindow)
            this.menuClosed = false;
    }

    toggleMenu() {
        this.menuClosed = !this.menuClosed;
    }
}
