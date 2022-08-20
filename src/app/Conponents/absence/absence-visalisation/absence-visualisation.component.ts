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
    @Input() absence!: AbsenceInfoDTO;
    @Input() isParent: boolean = false;

    constructor(
        private service: AbsencesService,
    ) { }

    parentVerify(verify: boolean){
        // this.absence.state = verify ? "verified" : "pending"; //TODO implement when API is ready
        this.service.saveAbsence(this.absence);
    }

    edit(){
        this.editAbsence.emit(this.absence);
    }

    get absenceService(): AbsencesService{
        return this.service;
    }
}
