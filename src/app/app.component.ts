import {AfterViewInit, Component, HostListener} from "@angular/core";
import {LanguagesService} from "./Framework/Languages/languages.service";
import {DarkThemeService} from "./Framework/dark-theme/dark-theme.service";
import { UserService } from "./Pages/user-settings/user.service";
import { Observable, of, startWith, switchMap } from "rxjs";
import { UserDTO } from "./DTOs/UserDTO";
import {MenuTreeDTO} from "./DTOs/MenuTreeDTO";
import {MenuTreeService} from "./Conponents/menu-tree/menu-tree.service";

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
    menuTree: MenuTreeDTO;
    isSignedIn$: Observable<boolean>;
    currentUser$: Observable<UserDTO | undefined>;

    constructor (
        private languageService: LanguagesService,
        private darkTheme: DarkThemeService,
        private userService: UserService,
        private menuTreeService: MenuTreeService,
    ) {
        this.languageService.setLanguageOnStartup();
        this.darkTheme.isDarkTheme$.asObservable().subscribe((isDarkTheme) => {
            this.darkTheme.applyDarkTheme(isDarkTheme);
        });
        this.onResize();
        this.isSignedIn$ = this.userService.isSignedIn$();
        this.currentUser$ = this.isSignedIn$.pipe(
            startWith(false),
            switchMap(isSignedIn => {
                if (isSignedIn) {
                    return this.userService.getCurrentUser$()
                } else {
                    return of(undefined)
                }
            })
        );

        this.menuTree = this.menuTreeService.getMenuTree();
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
}
