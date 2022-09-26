import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {appRoutes} from "../../Config/appRoutes";
import {ClassListDTO} from "../../DTOs/ClassList/ClassListDTO";
import { BehaviorSubject, filter, Observable, of, startWith, switchMap } from "rxjs";
import {ClasslistService} from "./classlist.service";

@Component({
    selector: 'app-class-info',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent {

    classList$: Observable<ClassListDTO>;
    hasLoaded$ = new BehaviorSubject<boolean>(false);

    constructor(
        private activeRoute: ActivatedRoute,
        private service: ClasslistService,
        private router: Router,
    ) {
        const className$ = this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            startWith(this.activeRoute.snapshot.paramMap.get(appRoutes.ClassName) ?? ""),
            switchMap(_ => of(this.activeRoute.snapshot.paramMap.get(appRoutes.ClassName) ?? "")),
        );
        className$.subscribe(_ => this.hasLoaded$.next(false));
        this.classList$ = className$.pipe(
            switchMap(className => this.service.getClass$(className)),
        );
        this.classList$.subscribe(_ => this.hasLoaded$.next(true));
    }
}
