import {Component, Input} from '@angular/core';
import {ChildDataDTO} from "../../../DTOs/ChildDataDTO";
import {GradeService} from "../grade.service";

@Component({
    selector: 'app-parent-child-preview',
    templateUrl: './parent-child-preview.component.html',
    styleUrls: ['./parent-child-preview.component.scss']
})
export class ParentChildPreviewComponent  {

    childDataDTO: ChildDataDTO | undefined;
    currentOverallAverages: Map<string, number> = new Map<string, number>();

    constructor(
        private grades: GradeService,
    ) { }

    @Input() set childData(value: ChildDataDTO) {
        this.childDataDTO = value;
        // [0]: api promises that the first element is the current semester
        this.currentOverallAverages = this.grades.getClassAveragesAsString(value.marks[0]);
    }
}
