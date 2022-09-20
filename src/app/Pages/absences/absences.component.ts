import {Component, OnInit} from '@angular/core';
import {AbsencesService} from './absences.service';
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
    newMode: boolean = false;

    private absenceInEditing: string | undefined;

    constructor(
        private service: AbsencesService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.loadAbsences();
        this.userService.getCurrentUser$()
            .subscribe(user => this.isParent = user.role === "parent");
    }

    loadAbsences(): void {
        this.service.clearCache();
        this.service.getAbsences$().subscribe(abs => {
            this.absenceInEditing = undefined;
            this.absences = abs;
        });
    }

    newAbsence() {
        let toDate = new Date(Date.now());
        toDate.setDate(toDate.getDate() + 2);

        const absence: AbsenceInfoDTO = {
            id: this.service.NEW_ABSENCE_ID,
            title: "New Absence",
            type: "holiday",
            state: "pending",
            description: "",
            from: Date.now(),
            to: toDate.valueOf(),
        };

        this.newMode = true;
        this.absences?.unshift(absence);
        this.absenceInEditing = absence.id;
        // I have to wait for the *ngFor to rerender with the new absence 🤦‍♂️
        setTimeout(() => this.scrollToNextAbsence(-1), 100);
    }

    doneEditing(cancel: boolean){
        if(this.newMode && cancel) this.absences?.shift();
        this.newMode = false;
        this.absenceInEditing = undefined;
        if(!cancel)
            this.loadAbsences();
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

    getEditMode(id: string): boolean{
        return this.absenceInEditing === id;
    }

    setEditMode(id: string){
        if(this.newMode){
            this.newMode = false;
            this.absences?.shift();
        }

        this.absenceInEditing = id;
    }

    verifiedAbsence(index: number) {
        if(this.absences) this.absences[index].state = "verified";
    }
}
