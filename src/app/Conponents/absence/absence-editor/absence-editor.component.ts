import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbsenceInfoDTO} from "../../../DTOs/Absence/AbsenceInfoDTO";
import {ApiService} from "../../../Framework/API/api.service";
import {AbsencesService} from "../../../Pages/absences/absences.service";
import {UserEventType} from "../../../DTOs/Enums/UserEventType";

@Component({
    selector: 'app-absence-editor',
    templateUrl: './absence-editor.component.html',
    styleUrls: ['./absence-editor.component.scss']
})
export class AbsenceEditorComponent implements OnInit{
    @Output("exit") exitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
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
            this.service.saveAbsence(this.absence).subscribe(() => this.exitEvent.emit(false));
        }
    }

    cancel(){
        this.exitEvent.emit(true);
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

    dateChange(from: boolean, changeEvent: any){
        if(from) this.absence.from = new Date(changeEvent.target.value).valueOf();
        else this.absence.to = new Date(changeEvent.target.value).valueOf();
        this.validate();
    }

    validate() {
        this.hasValidationError = this.absence.title.length < 3 ||
            this.absence.title.length > 50 ||
            this.absence.description.length > 500 ||
            this.absence.from > this.absence.to;
    }

    get absenceService(): AbsencesService{
        return this.service;
    }
}
