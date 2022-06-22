import {Component, Input} from '@angular/core';
import {SubjectData} from "../../../Pages/grades/grades-student-view/grades-student-view.component";

@Component({
    selector: 'app-class-grades',
    templateUrl: './class-grades.component.html',
    styleUrls: ['./class-grades.component.scss']
})
export class ClassGradesComponent {
    readonly SEMESTER_ICON: string = "home";
    readonly CLASS_ICON: string = "error";
    readonly SUBJECT_ICON: string = "error";

    @Input() classSelected: boolean = false;
    @Input() selectedSubject: SubjectData | undefined;
    examMenuTreeOpen: boolean = true;

    constructor() { }

    toggleMenuTree(){
        this.examMenuTreeOpen = !this.examMenuTreeOpen;
    }

    getRoundedMark(mark: number | undefined): string {
        if(mark === undefined) return "-";
        return Math.round(mark * 100) / 100 + "";
    }

}
