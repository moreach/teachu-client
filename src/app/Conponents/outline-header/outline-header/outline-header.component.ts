import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-outline-header',
    templateUrl: './outline-header.component.html',
    styleUrls: ['./outline-header.component.scss']
})
export class OutlineHeaderComponent{

    @Input() menuToggleIcon: string = "menu";
    @Input() menuClosed: boolean = false;
    @Output() menuClosedChange: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    toggleMenu() {
        this.menuClosedChange.emit(!this.menuClosed);
    }
}
