import {AfterViewInit, Component, HostListener} from "@angular/core";
import {LanguagesService} from "./Framework/Languages/languages.service";
import {DarkThemeService} from "./Framework/dark-theme/dark-theme.service";
import { UserService } from "./Pages/user-settings/user.service";
import { Observable } from "rxjs";
import {MenuTreeService} from "./Conponents/menu-tree/menu-tree.service";
import { MenuTreeDTO } from "./DTOs/xx_old/MenuTreeDTO";
import {UserOwnDTO} from "./DTOs/User/UserOwnDTO";
import {ParentService} from "./Framework/API/parent.service";

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
    menuTree$: Observable<MenuTreeDTO>;
    isSignedIn$: Observable<boolean>;
    currentUser$: Observable<UserOwnDTO | undefined>;
    isParent: boolean = false;

    constructor (
        private languageService: LanguagesService,
        private darkTheme: DarkThemeService,
        private userService: UserService,
        private menuTreeService: MenuTreeService,
        private parentService: ParentService,
    ) {
        this.languageService.setLanguageOnStartup();
        this.darkTheme.isDarkTheme$.asObservable().subscribe((isDarkTheme) => {
            this.darkTheme.applyDarkTheme(isDarkTheme);
        });
        this.onResize();
        this.isSignedIn$ = this.userService.isSignedIn$();
        this.currentUser$ = new Observable<UserOwnDTO | undefined>(subscriber => {
            this.userService.isSignedIn$().subscribe(signedIn => {
                if(signedIn){
                    this.userService.getCurrentUser$().subscribe(user => {
                        const parent = user.role === 'parent';
                        if(parent){
                            this.parentService.selectAStudent();
                            this.isParent = parent;
                        }
                        subscriber.next(user);
                    });
                } else subscriber.next(undefined);
            })
        });



        this.menuTree$ = this.menuTreeService.getMenuTree$();
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
