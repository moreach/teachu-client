import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {appRoutes} from "../../Config/appRoutes";
import {ClassListDTO} from "../../DTOs/ClassList/ClassListDTO";
import {Observable} from "rxjs";
import {ClasslistService} from "../classlist/classlist.service";

@Component({
    selector: 'app-class-info',
    templateUrl: './class-info.component.html',
    styleUrls: ['./class-info.component.scss']
})
export class ClassInfoComponent {

    className: string;
    classList$: Observable<ClassListDTO>;
    // TODO clean up naming and structure of classlist / classinfo
    constructor(
        private activeRoute: ActivatedRoute,
        private service: ClasslistService,
    ) {
        this.className = this.activeRoute.snapshot.paramMap.get(appRoutes.ClassName) ?? "";
        this.classList$ = service.getClass$(this.className);
    }
}
