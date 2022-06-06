import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuTreeItemDTO} from "../../../DTOs/MenuTreeDTO";
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu-leave',
    templateUrl: './menu-leave.component.html',
    styleUrls: ['./menu-leave.component.scss']
})
export class MenuLeaveComponent {

    @Input() item: MenuTreeItemDTO | undefined;
    @Output() leaveClickedEvent = new EventEmitter<void>();

    constructor(
        private router: Router,
    ) {
    }

    leaveClicked() {
        this.leaveClickedEvent.emit();
        this.router.navigate([this.item?.url]);
    }
}
