import {AfterViewInit, Component, HostListener} from "@angular/core";
import {LanguagesService} from "./Framework/Languages/languages.service";
import {DarkThemeService} from "./Framework/dark-theme/dark-theme.service";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    title = 'TeachU';
    bigWindow: boolean = false;
    menuClosed: boolean = false;

    constructor (
        private languageService: LanguagesService,
        private darkTheme: DarkThemeService,
        private overlay: OverlayContainer,
    ) {
        this.languageService.setLanguageOnStartup();
        this.darkTheme.isDarkTheme$.asObservable().subscribe((isDarkTheme) => {
            this.setDarkTheme(isDarkTheme);
        });
        this.onResize();
    }

    ngAfterViewInit(): void {
        this.setDarkTheme(this.darkTheme.getDarkTheme());
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

    setDarkTheme(isDarkTheme: boolean) {
        document.body.classList.toggle('darkTheme', isDarkTheme);
        if (isDarkTheme) {
            this.overlay.getContainerElement().classList.add('darkTheme');
        } else {
            this.overlay.getContainerElement().classList.remove('darkTheme');
        }
    }

    toggleMenu() {
        this.menuClosed = !this.menuClosed;
    }
}
