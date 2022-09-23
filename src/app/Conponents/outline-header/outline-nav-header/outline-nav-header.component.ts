import {Component, EventEmitter, Input, Output} from '@angular/core';
import { map, Observable } from 'rxjs';
import { DarkThemeService } from 'src/app/Framework/dark-theme/dark-theme.service';

@Component({
    selector: 'app-outline-nav-header',
    templateUrl: './outline-nav-header.component.html',
    styleUrls: ['./outline-nav-header.component.scss']
})
export class OutlineNavHeaderComponent {

    @Input() menuToggleIcon: string = "menu";
    @Input() menuClosed: boolean = false;
    @Output() menuClosedChange: EventEmitter<boolean> = new EventEmitter();

    getLogo$: Observable<string>;
    getBanner$: Observable<string>;

    constructor(
        private darkTheme: DarkThemeService,
    ) {
        const basePath = 'assets/images/';
        this.getLogo$ = this.darkTheme.getDarkTheme$().pipe(map(darkTheme => basePath + (darkTheme ? 'logo-dark.svg' : 'logo-light.svg')));
        this.getBanner$ = this.darkTheme.getDarkTheme$().pipe(map(darkTheme => basePath + (darkTheme ? 'banner-dark.svg' : 'banner-light.svg')));
    }

    toggleMenu() {
        this.menuClosedChange.emit(!this.menuClosed);
    }
}
