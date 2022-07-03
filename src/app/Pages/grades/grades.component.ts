import { Component, OnInit } from '@angular/core';
import {Role} from "../../Enums/Role";
import {UserService} from "../user-settings/user.service";
import {endpoints} from "../../Config/endpoints";
import {ApiService} from "../../Framework/API/api.service";
import {ChildDTO} from "../../DTOs/ChildDTO";
import {ChildDataDTO} from "../../DTOs/ChildDataDTO";

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

    currentUserRole!: Role;
    data: any = {};

    constructor(
        private userService: UserService,
        private api: ApiService,
    ) { }

    ngOnInit(): void {
        this.userService.getCurrentUser$().subscribe((user) => {
            this.currentUserRole = user.role;

            switch (this.currentUserRole) {
                case "STUDENT":
                    this.api.callApi<any>(endpoints.studentGrade, {}, 'GET')
                        .subscribe((response) => { this.data = response.semesters });
                    break;
                case "PARENT":
                    this.api.callApi<any>(endpoints.parentChildren, {}, 'GET')
                        .subscribe((response) => {
                            let childrenMarks: ChildDataDTO[] = [];

                            for (let child of (response.children as ChildDTO[])) {
                                this.api.callApi<any>(`${endpoints.parentChildren}/${child.id}`, {}, 'GET')
                                    .subscribe(childGrades => {
                                        childrenMarks.push(childGrades);
                                        this.data = childrenMarks;
                                    });
                            }
                        });
                    break;
            }
        });

    }
}
