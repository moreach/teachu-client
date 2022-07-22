import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import { MenuTreeItemDTO } from 'src/app/DTOs/xx_old/MenuTreeDTO';

@Component({
    selector: 'app-menu-leave',
    templateUrl: './menu-leave.component.html',
    styleUrls: ['./menu-leave.component.scss']
})
export class MenuLeaveComponent {

    @Input() item: MenuTreeItemDTO | undefined;
    @Output() leaveClickedEvent = new EventEmitter<MenuTreeItemDTO>();

    constructor(
        private router: Router,
    ) {
    }

    leaveClicked() {
        this.leaveClickedEvent.emit(this.item);
        if (this.item != undefined && !!this.item.url) {
            this.router.navigate([this.item.url]);
        }
    }
}
