import {Injectable} from '@angular/core';
import {ApiService} from "../../Framework/API/api.service";
import {AbsenceInfoDTO} from "../../DTOs/Absence/AbsenceInfoDTO";
import {endpoints} from "../../Config/endpoints";
import {Observable} from "rxjs";
import {UserEventType} from "../../DTOs/Enums/UserEventType";
import {UserEventState} from "../../DTOs/Enums/UserEventState";

@Injectable({
    providedIn: 'root'
})
export class AbsencesService{
    readonly STATE_TRANSLATION_BASE: string = "absences.state.";
    readonly TYPE_TRANSLATION_BASE: string = "absences.type.";
    readonly NEW_ABSENCE_ID: string = "--new--";

    private absences: Observable<AbsenceInfoDTO[]> | undefined;

    constructor(
        private api: ApiService,
    ) { }

    verifyAbsence(absence: AbsenceInfoDTO): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.api.callApi(endpoints.AbsenceVerify + "/" + absence.id, {}, "PUT")
                .subscribe({
                    next: () => resolve(),
                    error: () => reject(),
                }));
    }

    saveAbsence(absence: AbsenceInfoDTO): Observable<string> {
        const isNew: boolean = this.NEW_ABSENCE_ID === absence.id;
        if(isNew)
            return this.api.callApi(endpoints.Absence, absence, 'POST');
        else
            return this.api.callApi(endpoints.Absence + "/" + absence.id, absence, 'PUT');
    }

    getAbsences$(): Observable<AbsenceInfoDTO[]>{
        if(!this.absences)
            this.absences = this.api.callApi<AbsenceInfoDTO[]>(endpoints.Absence, {}, "GET");

        return this.absences;
    }

    getAbsenceTypeColor(type: UserEventType): "primary" | "accent" | "secondary" | "warn" {
        switch (type){
            case "holiday":
                return "accent";
            case "sick":
                return "warn";
        }
    }

    getAbsenceTypeIcon(type: UserEventType): string {
        switch (type){
            case "holiday":
                return "houseboat";
            case "sick":
                return "sick";
        }
    }

    getAbsenceStateColor(state: UserEventState): "primary" | "accent" | "secondary" | "warn" {
        switch (state){
            case "excused":
                return "accent";
            case "verified":
                return "secondary"
            case "pending":
                return "primary";
            case "unexcused":
                return "warn";
        }
    }

    getAbsenceStateIcon(state: UserEventState): string {
        switch (state){
            case "excused":
                return "done";
            case "verified":
                return "how_to_reg";
            case "pending":
                return "pending_actions";
            case "unexcused":
                return "block";
        }
    }

    clearCache() {
        this.absences = undefined;
    }
}
