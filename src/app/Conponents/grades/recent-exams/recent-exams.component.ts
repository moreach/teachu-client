import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SemesterDTO} from "../../../DTOs/grades/SemesterDTO";
import {GradeDTO} from "../../../DTOs/grades/GradeDTO";
import {GradeService} from "../grade.service";

@Component({
    selector: 'app-recent-exams',
    templateUrl: './recent-exams.component.html',
    styleUrls: ['./recent-exams.component.scss']
})
export class RecentExamsComponent {

    @Input() amount: number = 4;
    @Output() examClickedEvent: EventEmitter<GradeDTO> = new EventEmitter<GradeDTO>();
    recentExams: GradeDTO[] = [];

    constructor(
        private grades: GradeService,
    ) { }

    @Input() set semesterData(semesterData: SemesterDTO[]) {
        this.recentExams = this.grades.getLastExams(semesterData, this.amount);
    }

    examClicked(grade: GradeDTO): void {
        this.examClickedEvent.emit(grade);
    }
}
