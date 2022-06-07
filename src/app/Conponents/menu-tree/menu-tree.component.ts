import {Component, EventEmitter, Output} from '@angular/core';
import {MenuTreeService} from "./menu-tree.service";
import {MenuTreeDTO} from "../../DTOs/MenuTreeDTO";

@Component({
    selector: 'app-menu-tree',
    templateUrl: './menu-tree.component.html',
    styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent {

    @Output() leaveClickedEvent = new EventEmitter<void>();

    menuTree: MenuTreeDTO;

    constructor(
        menuService: MenuTreeService,
    ) {
        this.menuTree = menuService.getMenuTree();
    }

    leaveClicked() {
        this.leaveClickedEvent.emit();
    }
}
