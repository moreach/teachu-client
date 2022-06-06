import { Component, OnInit } from '@angular/core';
import {Role} from "../../Enums/Role";

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {

    }

    getCurrentUserRole(): Role {
        return "STUDENT";
    }
}
