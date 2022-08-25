import {Component, OnInit} from '@angular/core';
import {AbsenceEditDoneDTO, AbsencesService} from './absences.service';
import {AbsenceInfoDTO} from "../../DTOs/Absence/AbsenceInfoDTO";
import {UserService} from "../user-settings/user.service";

@Component({
    selector: 'app-absences',
    templateUrl: './absences.component.html',
    styleUrls: ['./absences.component.scss']
})
// TODO: - implement parent verified logic
//       - fix parent edit (studentId parameter is not added)
//       - reload all absences after creating new, maybe even after editing
//       - implement use of start and end

export class AbsencesComponent implements OnInit{
    readonly ABSENCE_ELEMENT_ID_BASE: string = "absence-";

    absences: AbsenceInfoDTO[] | undefined;
    isParent: boolean = false;

    private absencesInEditing: boolean[] = [];

    constructor(
        private service: AbsencesService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.service.getAbsences$().subscribe(abs => {
            this.absences = abs;
            this.absencesInEditing = Array(this.absences.length).fill(false);
        });
        this.userService.getCurrentUser$()
            .subscribe(user => this.isParent = user.role === "parent");
    }

    newAbsence() {
        const absence: AbsenceInfoDTO = {
            id: this.service.NEW_ABSENCE_ID,
            title: "New Absence",
            type: "holiday",
            state: "pending",
            description: "",
            from: new Date(),
            to: new Date(),
        };

        this.absences?.unshift(absence);
        this.absencesInEditing.unshift(true);
        // I have to wait for the *ngFor to rerender with the new absence 🤦‍♂️
        setTimeout(() => this.scrollToNextAbsence(-1), 100);
    }

    doneEditing(index: number, doneEditingDTO: AbsenceEditDoneDTO){
        this.setEditMode(index, false);

        if(this.absences){
            if(doneEditingDTO.canceled && doneEditingDTO.new){
                this.absences.shift();
                this.absencesInEditing.shift();
            } else {
                if(this.isParent){
                    // changedAbsence.state = "verified"; TODO: wait for api implementation
                }else doneEditingDTO.absence.state = "pending";

                const indexToChange: number = this.absences.findIndex(a => a.id === doneEditingDTO.absence.id);
                if(indexToChange !== -1)
                    this.absences[indexToChange] = doneEditingDTO.absence;
            }
        }else{
            console.error("Tried to save absence, when not done loading absences")
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

    getEditMode(index: number): boolean{
        return this.absencesInEditing[index];
    }

    setEditMode(index: number, value: boolean){
        this.absencesInEditing[index] = value;
    }
}
