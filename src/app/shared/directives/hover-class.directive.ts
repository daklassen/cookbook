import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[appHoverClass]' })
export class HoverClassDirective {
  hoverClass: string;

  @Input()
  set appHoverClass(hoverClass: string) {
    this.hoverClass = hoverClass;
  }

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover')
  mouseover() {
    this.renderer.addClass(this.elementRef.nativeElement, this.hoverClass);
  }

  @HostListener('mouseout')
  mouseout() {
    this.renderer.removeClass(this.elementRef.nativeElement, this.hoverClass);
  }
}
