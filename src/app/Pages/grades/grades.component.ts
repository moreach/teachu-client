import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-settings/user.service";
import {endpoints} from "../../Config/endpoints";
import {ApiService} from "../../Framework/API/api.service";
import {GradeSemesterDTO} from "../../DTOs/Grade/GradeDTOs";

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

    gradeSemesters: GradeSemesterDTO[] = [];

    constructor(
        private userService: UserService,
        private api: ApiService,
    ) { }

    ngOnInit(): void {
        this.api.callApi<GradeSemesterDTO[]>(endpoints.Grade, {}, 'GET')
            .subscribe((grades) => this.gradeSemesters = grades);
    }
}
