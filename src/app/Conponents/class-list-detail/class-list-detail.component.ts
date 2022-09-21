import {Component, Input} from '@angular/core';
import {ClassListStudentDTO} from "../../DTOs/ClassList/ClassListDTO";

@Component({
    selector: 'app-class-list-detail',
    templateUrl: './class-list-detail.component.html',
    styleUrls: ['./class-list-detail.component.scss']
})
export class ClassListDetailComponent {
    @Input() person!: ClassListStudentDTO;

    constructor() { }

}
