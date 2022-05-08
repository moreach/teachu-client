import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, HostListener, Input,} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from "@angular/animations";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
    selector: '[expansion-wrapper]',
    templateUrl: './expansion-wrapper.component.html',
    styleUrls: ['./expansion-wrapper.component.scss'],
    animations: [
        trigger('openClose', [
            state('true', style({
                height: '*',
            })),
            state('false', style({
                height: '0px',
            })),
            transition('true <=> false', [
                animate('200ms ease'),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpansionWrapperComponent {

    inOpenCloseAnimation: boolean = false;
    private _expanded: boolean = false;

    constructor(
        private changeDetector: ChangeDetectorRef,
    ) {
    }

    @HostBinding('@openClose') get openClose() {
        return this._expanded;
    }

    @HostListener('@openClose.start', ['$event'])
    @HostListener('@openClose.done', ['$event'])
    onAnimation(event: AnimationEvent) {
        this.inOpenCloseAnimation = event.phaseName === 'start';
    }

    @Input()
    @HostBinding('class.expanded')
    set expanded(expanded: boolean) {
        this._expanded = coerceBooleanProperty(expanded);
    }

    get expanded() {
        return this._expanded;
    }

    toggle() {
        this.inOpenCloseAnimation = true;
        this._expanded = !this._expanded;
        this.changeDetector.markForCheck();
    }

}
