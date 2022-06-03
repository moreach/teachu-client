import {AfterViewInit, Component, HostListener} from "@angular/core";
import {LanguagesService} from "./Framework/Languages/languages.service";
import {DarkThemeService} from "./Framework/dark-theme/dark-theme.service";
import {UserDTO} from "./DTOs/UserDTO";

const WINDOW_WIDTH_BREAKPOINT: number = 1000;

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
    ) {
        this.languageService.setLanguageOnStartup();
        this.darkTheme.isDarkTheme$.asObservable().subscribe((isDarkTheme) => {
            this.darkTheme.applyDarkTheme(isDarkTheme);
        });
        this.onResize();
    }

    ngAfterViewInit(): void {
        this.darkTheme.applyDarkTheme(this.darkTheme.getDarkTheme());
    }

    @HostListener("window:resize", [])
    onResize() {
        let oldBigWindow = this.bigWindow;
        this.bigWindow = window.innerWidth > WINDOW_WIDTH_BREAKPOINT;
        if(!this.menuClosed && window.innerWidth < WINDOW_WIDTH_BREAKPOINT)
            this.menuClosed = true;

        if(this.bigWindow && !oldBigWindow)
            this.menuClosed = false;
    }

    toggleMenu() {
        this.menuClosed = !this.menuClosed;
    }

    getCurrentUser(): UserDTO{
        return {
            email: "test@mail.com",
            role: "STUDENT",
            firstName: "Test",
            lastName: "User",
            birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
            sex: "MALE",
            language: "ENGLISH",
            darkTheme: false,
            city: "CoolState",
            postalCode: "12332",
            street: "BestStreet 10",
            phone: "+41 23 098 65 71",
            profileImage: "assets/images/mock-profile-image.jpg"
        };
    }
}
