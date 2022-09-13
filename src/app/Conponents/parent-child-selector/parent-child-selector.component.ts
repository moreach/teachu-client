import { Component } from '@angular/core';
import {ParentChildDTO} from "../../DTOs/User/ParentChildDTO";
import {ParentService} from "../../Framework/API/parent.service";
import {appConfig} from "../../Config/appConfig";

@Component({
    selector: 'app-parent-child-selector',
    templateUrl: './parent-child-selector.component.html',
})
export class ParentChildSelectorComponent {

    children: ParentChildDTO[] = [];
    private _selectedChild: ParentChildDTO | undefined;

    constructor(
        private parentService: ParentService,
    ) {
        this.parentService.getChildren().then(ch => {
            this.children = ch;
            const savedStudentId = localStorage.getItem(appConfig.APPLICATION_SELECTED_STUDENT);
            if(savedStudentId) parentService.getChildById(savedStudentId).then(child => this._selectedChild = child );
        });
    }

    public get selectedChild(): ParentChildDTO | undefined {
        return this._selectedChild;
    }

    public set selectedChild(value: ParentChildDTO | undefined) {
        this._selectedChild = value;
        if(value) localStorage.setItem(appConfig.APPLICATION_SELECTED_STUDENT, value?.id);
        location.reload();
    }
}
