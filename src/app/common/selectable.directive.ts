import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSelectable]'
})
export class SelectableDirective {

  @Input() public set selected(value: boolean) {
    this.el.nativeElement.classList['active'] = value;
  }

  constructor(private el: ElementRef) { }

}
