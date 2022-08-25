import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbsenceInfoDTO} from "../../../DTOs/Absence/AbsenceInfoDTO";
import {ApiService} from "../../../Framework/API/api.service";
import {AbsenceEditDoneDTO, AbsencesService} from "../../../Pages/absences/absences.service";
import {UserEventType} from "../../../DTOs/Enums/UserEventType";

@Component({
    selector: 'app-absence-editor',
    templateUrl: './absence-editor.component.html',
    styleUrls: ['./absence-editor.component.scss']
})
export class AbsenceEditorComponent implements OnInit{
    @Output("exit") exitEvent: EventEmitter<AbsenceEditDoneDTO> = new EventEmitter<AbsenceEditDoneDTO>();
    @Input() absence!: AbsenceInfoDTO;
    hasValidationError: boolean = false;

    constructor(
        private api: ApiService,
        private service: AbsencesService,
    ) { }

    ngOnInit(): void {
        this.absence = { ...this.absence}; // js uses references --> clone --> cancel works ...
    }

    save() {
        this.validate();
        if(!this.hasValidationError){
            this.service.saveAbsence(this.absence)
                .then(doneDTO => this.exitEvent.emit(doneDTO))
                .catch(() => console.error("can't save absence"));
        }
    }

    cancel(){
        this.exitEvent.emit({
            absence: this.absence,
            new: this.absence.id === this.service.NEW_ABSENCE_ID,
            canceled: true,
        });
    }

    titleChange(changeEvent: any){
        this.absence.title = changeEvent.target.value;
        this.validate();
    }

    descChange(changeEvent: any) {
        this.absence.description = changeEvent.target.value;
        this.validate();
    }

    typeChange(newType: UserEventType){
        if(newType)
            this.absence.type = newType;
    }

    validate() {
        this.hasValidationError = this.absence.title.length < 3 ||
            this.absence.title.length > 50 ||
            this.absence.description.length > 500;
    }

    get absenceService(): AbsencesService{
        return this.service;
    }
}
