import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {appRoutes} from "../../Config/appRoutes";
import {ClassListDTO} from "../../DTOs/ClassList/ClassListDTO";
import {Observable} from "rxjs";
import {ClasslistService} from "./classlist.service";

@Component({
    selector: 'app-class-info',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent {

    className: string;
    classList$: Observable<ClassListDTO>;

    constructor(
        private activeRoute: ActivatedRoute,
        private service: ClasslistService,
    ) {
        this.className = this.activeRoute.snapshot.paramMap.get(appRoutes.ClassName) ?? "";
        this.classList$ = service.getClass$(this.className);
    }
}
