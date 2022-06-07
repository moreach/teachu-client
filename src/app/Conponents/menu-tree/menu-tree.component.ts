import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuTreeDTO, MenuTreeItemDTO} from "../../DTOs/MenuTreeDTO";

@Component({
    selector: 'app-menu-tree',
    templateUrl: './menu-tree.component.html',
    styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent {

    @Input() indentationWidth: number = 10;
    @Input() treeData: MenuTreeDTO = { tree: [] };
    @Output() leaveClickedEvent = new EventEmitter<MenuTreeItemDTO>();

    constructor() {
    }

    leaveClicked(data: MenuTreeItemDTO) {
        this.leaveClickedEvent.emit(data);
    }
}
