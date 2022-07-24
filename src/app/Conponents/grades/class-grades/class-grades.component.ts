import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubjectData} from "../../../Pages/grades/grades-student-view/grades-student-view.component";
import {GradeDTO} from "../../../DTOs/Grade/GradeDTOs";

@Component({
    selector: 'app-class-grades',
    templateUrl: './class-grades.component.html',
    styleUrls: ['./class-grades.component.scss']
})
export class ClassGradesComponent {
    readonly SEMESTER_ICON: string = "home";
    readonly CLASS_ICON: string = "error";
    readonly SUBJECT_ICON: string = "error";

    @Input() selectedSubject: SubjectData | undefined;
    @Output() openMenuClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() gradeSelected: EventEmitter<GradeDTO> = new EventEmitter<GradeDTO>();

    constructor() { }

    toggleMenuTree(){
        this.openMenuClicked.emit(true);
    }

    selectGrade(grade: GradeDTO): void {
        this.gradeSelected.emit(grade);
    }

    getRoundedMark(mark: number | undefined): string {
        if(mark === undefined) return "-";
        return Math.round(mark * 100) / 100 + "";
    }

}
