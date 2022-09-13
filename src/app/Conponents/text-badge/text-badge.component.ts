import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-text-badge',
    templateUrl: './text-badge.component.html',
    styleUrls: ['./text-badge.component.scss']
})
export class TextBadgeComponent {

    @Input() text: string | undefined;
    @Input() matIcon: string | undefined;
    @Input() iconFirst: boolean = false;
    @Input() color: "primary" | "accent" | "secondary" | "warn" = "primary";

}
