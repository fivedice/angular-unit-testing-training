import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSelectable]'
})
export class SelectableDirective {

  @Input()
  @HostBinding('class.active')
  selected: boolean;
}
