import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserDTO} from "../../../DTOs/UserDTO";

@Component({
    selector: 'app-outline-header',
    templateUrl: './outline-header.component.html',
    styleUrls: ['./outline-header.component.scss']
})
export class OutlineHeaderComponent{

    @Input() currentUser: UserDTO | undefined;
    @Input() menuToggleIcon: string = "menu";
    @Input() menuClosed: boolean = false;
    @Output() menuClosedChange: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    toggleMenu() {
        this.menuClosedChange.emit(!this.menuClosed);
    }
}
