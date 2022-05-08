import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-outline-nav-header',
    templateUrl: './outline-nav-header.component.html',
    styleUrls: ['./outline-nav-header.component.scss']
})
export class OutlineNavHeaderComponent {

    @Input() menuToggleIcon: string = "menu";
    @Input() menuClosed: boolean = false;
    @Output() menuClosedChange: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    toggleMenu() {
        this.menuClosedChange.emit(!this.menuClosed);
    }
}
