import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-settings/user.service";
import {endpoints} from "../../Config/endpoints";
import {ApiService} from "../../Framework/API/api.service";
import {UserRole} from "../../DTOs/User/UserRole";
import {GradeSemesterDTO} from "../../DTOs/Grade/GradeDTOs";

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

    currentUserRole!: UserRole;
    data: any = {};

    constructor(
        private userService: UserService,
        private api: ApiService,
    ) { }

    ngOnInit(): void {
        this.userService.getCurrentUser$().subscribe((user) => {
            this.currentUserRole = user.role;

            switch (this.currentUserRole) {
                case "student":
                    this.api.callApi<GradeSemesterDTO>(endpoints.grades, {}, 'GET')
                        .subscribe((grades) => this.data = grades);
                    break;
                // TODO: implementation of parent is still under construction
                // case "parent":
                //     this.api.callApi<any>(endpoints.parentChildren, {}, 'GET')
                //         .subscribe((response) => {
                //             let childrenMarks: ChildDataDTO[] = [];
                //
                //             for (let child of (response.children as ChildDTO[])) {
                //                 this.api.callApi<any>(`${endpoints.parentChildren}/${child.id}`, {}, 'GET')
                //                     .subscribe(childGrades => {
                //                         childrenMarks.push(childGrades);
                //                         this.data = childrenMarks;
                //                     });
                //             }
                //         });
                //     break;
            }
        });
    }
}
