import {AfterViewInit, Component, HostListener} from "@angular/core";
import {LanguagesService} from "./Framework/Languages/languages.service";
import {DarkThemeService} from "./Framework/dark-theme/dark-theme.service";
import {UserDTO} from "./DTOs/UserDTO";
import { endpoints } from "./Config/endpoints";
import { distinctUntilChanged, filter, map, Observable, of, startWith, switchMap } from "rxjs";
import { ApiService } from "./Framework/API/api.service";
import { NavigationEnd, Router } from "@angular/router";
import { appRoutes } from "./Config/appRoutes";

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
        private apiService: ApiService,
        private router: Router,
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

    getCurrentUser$(): Observable<UserDTO | undefined> {
        // todo bind to backend without endless loop :)
        return this.isSignedIn$().pipe(
            map(_ => undefined)
            // switchMap(isAuthenticated => {
            //     if(isAuthenticated)
            //         return this.apiService.callApi<UserDTO>(endpoints.User, {}, 'GET');
            //     else
            //         return of(undefined);
            // })
        );
    }

    isSignedIn$(): Observable<boolean>  {
        return this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => (event as NavigationEnd).url),
            startWith(this.router.url),
            map(url => url.split('/').some(u => u.toLowerCase() === appRoutes.App)),
            distinctUntilChanged(),
        );
    }
}
