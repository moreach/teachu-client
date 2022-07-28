import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GradeDTO} from "../../../DTOs/Grade/GradeDTOs";

@Component({
    selector: 'app-grade-detail',
    templateUrl: './grade-detail.component.html',
    styleUrls: ['./grade-detail.component.scss']
})
export class GradeDetailComponent {

    @Input() grade: GradeDTO | undefined;
    @Output() closeGradeDetail: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    close(): void {
        this.closeGradeDetail.emit();
    }

}
