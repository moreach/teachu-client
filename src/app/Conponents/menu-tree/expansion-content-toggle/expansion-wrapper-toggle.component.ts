import {ChangeDetectionStrategy, Component, HostBinding, HostListener, Input} from '@angular/core';
import {ExpansionWrapperComponent} from "../expansion-wrapper/expansion-wrapper.component";

@Component({
    selector: 'app-expansion-content-toggle, [expansionContentToggle]',
    templateUrl: './expansion-wrapper-toggle.component.html',
    styleUrls: ['./expansion-wrapper-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpansionWrapperToggleComponent {
    @Input() disabled = false;

    @HostBinding('class') @Input() position: 'start' | 'end' = 'end';

    @Input() target!: ExpansionWrapperComponent;

    @HostListener('click', ['$event']) clickEvent(event: MouseEvent) {
        this.target.toggle();
    }

    constructor() {
    }
}
