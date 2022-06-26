import { Component, OnInit } from '@angular/core';
import {Role} from "../../Enums/Role";
import {UserService} from "../user-settings/user.service";

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

    currentUserRole!: Role;

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.userService.getCurrentUser$().subscribe((user) =>
            this.currentUserRole = user.role);
    }
}
