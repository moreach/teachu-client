import {Component, Input} from '@angular/core';
import { MenuTreeItemDTO } from 'src/app/DTOs/xx_old/MenuTreeDTO';

@Component({
    selector: 'app-menu-node',
    templateUrl: './menu-node.component.html',
    styleUrls: ['./menu-node.component.scss']
})
export class MenuNodeComponent {

    @Input() node: MenuTreeItemDTO | undefined;

    constructor() {
    }
}
