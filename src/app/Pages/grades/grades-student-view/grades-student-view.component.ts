import { Component, OnInit } from '@angular/core';
import {SemesterDTO} from "../../../DTOs/grades/SemesterDTO";
import {ApiService} from "../../../Framework/API/api.service";
import {endpoints} from "../../../Config/endpoints";

@Component({
    selector: 'app-grades-student-view',
    templateUrl: './grades-student-view.component.html',
    styleUrls: ['./grades-student-view.component.scss']
})
export class GradesStudentViewComponent implements OnInit {

    allSemesters: SemesterDTO[] = [];

    constructor(
        private api: ApiService,
    ) { }

    ngOnInit(): void {
        this.api.callApi<SemesterDTO[]>(endpoints.studentGrade, {}, 'GET')
            .subscribe((semesters) => this.allSemesters = semesters);
    }

    print(): string{
        return JSON.stringify(this.allSemesters)
    }
}
