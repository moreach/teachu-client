import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbsenceInfoDTO} from "../../../DTOs/Absence/AbsenceInfoDTO";
import {AbsencesService} from "../../../Pages/absences/absences.service";

@Component({
    selector: 'app-absence-visualisation',
    templateUrl: './absence-visualisation.component.html',
    styleUrls: ['./absence-visualisation.component.scss']
})
export class AbsenceVisualisationComponent {
    @Output() editAbsence: EventEmitter<AbsenceInfoDTO> = new EventEmitter<AbsenceInfoDTO>();
    @Output() verifiedAbsence: EventEmitter<void> = new EventEmitter<void>();
    @Input() absence!: AbsenceInfoDTO;
    @Input() isParent: boolean = false;

    constructor(
        private service: AbsencesService,
    ) { }

    parentVerify(){
        this.absence.state = "verified";
        this.service.verifyAbsence(this.absence).then(() => this.verifiedAbsence.emit());
    }

    edit(){
        this.editAbsence.emit(this.absence);
    }

    showVerify(): boolean {
        return this.isParent && this.absence?.state !== "verified";
    }

    get absenceService(): AbsencesService{
        return this.service;
    }
}
