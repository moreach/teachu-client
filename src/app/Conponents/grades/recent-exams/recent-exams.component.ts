import {Component, Input} from '@angular/core';
import {GradeDTO} from "../../../DTOs/grades/GradeDTO";

@Component({
    selector: 'app-recent-exams',
    templateUrl: './recent-exams.component.html',
    styleUrls: ['./recent-exams.component.scss']
})
export class RecentExamsComponent {

    @Input() recentExams: GradeDTO[] = [];

    constructor() { }

}
