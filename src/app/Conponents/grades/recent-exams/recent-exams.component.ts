import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GradeService} from "../grade.service";
import {GradeDTO, GradeSemesterDTO} from "../../../DTOs/Grade/GradeDTOs";

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

    @Input() set semesterData(semesterData: GradeSemesterDTO[]) {
        if(semesterData.length > 0)
            this.recentExams = this.grades.getLastExams(semesterData, this.amount);
    }

    examClicked(grade: GradeDTO): void {
        this.examClickedEvent.emit(grade);
    }
}
