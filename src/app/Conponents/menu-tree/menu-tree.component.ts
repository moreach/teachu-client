import {Component} from '@angular/core';
import {MenuTreeService} from "./menu-tree.service";
import {MenuTreeDTO} from "../../DTOs/MenuTreeDTO";

@Component({
    selector: 'app-menu-tree',
    templateUrl: './menu-tree.component.html',
    styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent {

    menuTree: MenuTreeDTO;

    constructor(
        private menuService: MenuTreeService,
    ) {
        this.menuTree = menuService.getMenuTree();
    }

}
