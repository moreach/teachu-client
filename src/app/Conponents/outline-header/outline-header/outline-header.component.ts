import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith, distinctUntilChanged } from 'rxjs';
import { appRoutes } from 'src/app/Config/appRoutes';
import {UserOwnDTO} from "../../../DTOs/User/UserOwnDTO";

@Component({
    selector: 'app-outline-header',
    templateUrl: './outline-header.component.html',
    styleUrls: ['./outline-header.component.scss']
})
export class OutlineHeaderComponent{

    @Input() currentUser: UserOwnDTO | undefined;
    @Input() menuToggleIcon: string = "menu";
    @Input() menuClosed: boolean = false;
    @Output() menuClosedChange: EventEmitter<boolean> = new EventEmitter();
    title$: Observable<string> | undefined;

    constructor(
        private router: Router,
    ) {
        this.title$ = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => (event as NavigationEnd).url),
            startWith(this.router.url),
            map(url => {
                const index = url.split('/').findIndex(u => u.toLowerCase() === appRoutes.App);
                if (index === -1) {
                    return '';
                }
                const segment = url.split('/')[index + 1];
                return `${segment}.${segment}`;
            }),
            distinctUntilChanged(),
        ); 
    }

    toggleMenu() {
        this.menuClosedChange.emit(!this.menuClosed);
    }
}
