import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import { MenuTreeItemDTO } from 'src/app/DTOs/Menu/MenuTreeDTO';
import { environment } from 'src/environments/environment';

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
            if (this.item.isTeachu) {
                this.router.navigate([this.item.url]);
            } else {
                window.location.href = environment.URL_LEARNZ_FRONTEND + this.item.url;
            }
        }
    }
}
