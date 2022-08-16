import {Component, OnInit} from '@angular/core';
import { AbsencesService } from './absences.service';
import {AbsenceInfoDTO} from "../../DTOs/Absence/AbsenceInfoDTO";
import {UserEventType} from "../../DTOs/Enums/UserEventType";
import {UserEventState} from "../../DTOs/Enums/UserEventState";

@Component({
    selector: 'app-absences',
    templateUrl: './absences.component.html',
    styleUrls: ['./absences.component.scss']
})
export class AbsencesComponent implements OnInit{
    readonly ABSENCE_ELEMENT_ID_BASE: string = "absence-";
    readonly STATE_TRANSLATION_BASE: string = "absences.state.";
    readonly TYPE_TRANSLATION_BASE: string = "absences.type.";

    absences: AbsenceInfoDTO[] = [];

    constructor(
        private absencesService: AbsencesService,
    ) { }

    ngOnInit(): void {
        this.absencesService.loadAbsences().subscribe(res => this.absences = res);
    }

    scrollToNextAbsence(currentAbsence: number) {
        document.getElementById(this.ABSENCE_ELEMENT_ID_BASE + (currentAbsence + 1) as string)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    isLastOfArray(index: number): boolean {
        return index >= this.absences.length - 1;
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
            case "pending":
                return "pending_actions";
            case "unexcused":
                return "block";
        }
    }
}
