import {Component, OnInit} from '@angular/core';
import { AbsencesService } from './absences.service';
import {AbsenceInfoDTO} from "../../DTOs/Absence/AbsenceInfoDTO";
import {UserService} from "../user-settings/user.service";

@Component({
    selector: 'app-absences',
    templateUrl: './absences.component.html',
    styleUrls: ['./absences.component.scss']
})
export class AbsencesComponent implements OnInit{
    readonly ABSENCE_ELEMENT_ID_BASE: string = "absence-";

    absences: AbsenceInfoDTO[] | undefined;
    isParent: boolean = false;
    editMode: boolean = false;

    constructor(
        private service: AbsencesService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.service.getAbsences$().subscribe(abs => this.absences = abs);
        this.userService.getCurrentUser$()
            .subscribe(user => this.isParent = user.role === "parent");
    }

    doneEditing(changedAbsence: AbsenceInfoDTO | undefined){
        this.editMode = false;
        if(changedAbsence && this.absences) {
            if(this.isParent){
                // changedAbsence.state = "verified"; TODO: wait for api implementation
            }else changedAbsence.state = "pending";

            const indexToChange: number = this.absences.findIndex(a => a.id === changedAbsence.id);

            if(indexToChange === -1)
                this.absences.push(changedAbsence);
            else
                this.absences[indexToChange] = changedAbsence;
        }
    }

    scrollToNextAbsence(currentAbsence: number) {
        document.getElementById(this.ABSENCE_ELEMENT_ID_BASE + (currentAbsence + 1) as string)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    isLastOfMap(index: number): boolean {
        if(this.absences)
            return index >= this.absences.length - 1;
        return false;
    }
}
