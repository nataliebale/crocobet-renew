import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[crcClickOutside]'
})
export class ClickOutsideDirective {
  private allowClose = true;

  constructor(private _elementRef: ElementRef) {}

  @Output() crcClickOutside = new EventEmitter<void>();

  @HostListener('click', ['$event']) clickInside() {
    this.allowClose = false;
  }

  @HostListener('document:click', ['$event.target']) onMouseEnter(
    targetElement: HTMLElement
  ) {
    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.allowClose) {
      this.crcClickOutside.emit();
    }
    this.allowClose = true;
  }
}
