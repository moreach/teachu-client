import { ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: '[showSpinner]'
})
export class SpinnerDirective {
  isSpinning: boolean = false;
  spinner: MatProgressSpinner | null = null;
  
  @Input() set showSpinner(condition: boolean) {
    if (!!condition !== this.isSpinning) {
      this.spinner = null;
      this.viewContainer.clear();
      this.isSpinning = condition;
      if (!condition) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.addSpinner();
      }
    }
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  private addSpinner() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MatProgressSpinner);
    const { instance } = this.viewContainer.createComponent<MatProgressSpinner>(componentFactory);
    instance.diameter = 100;
    instance.color = 'accent';
    instance.mode = 'indeterminate';
    instance._elementRef.nativeElement.classList.add('spin-on-instance');
    this.spinner = instance;
  }
}
