import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSelectable]'
})
export class SelectableDirective {

  @Input() public set selected(value: boolean) {
    if (value) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }

  constructor(private renderer: Renderer2, private el: ElementRef) { }

}
