import {Component, Input} from '@angular/core';
import {MenuTreeItemDTO} from "../../../DTOs/MenuTreeDTO";
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu-leave',
    templateUrl: './menu-leave.component.html',
    styleUrls: ['./menu-leave.component.scss']
})
export class MenuLeaveComponent {

    @Input() item: MenuTreeItemDTO | undefined;

    constructor(
        private router: Router,
    ) {
    }

    redirectToUrl() {
        this.router.navigate([this.item?.url]);
    }
}
