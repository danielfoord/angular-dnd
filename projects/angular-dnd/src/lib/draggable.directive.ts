import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[libDraggable]'
})
export class DraggableDirective {

  constructor(el: ElementRef) { 
    console.debug(el);
    el.nativeElement.style.cursor = 'move';
    el.nativeElement.draggable = true;
  }

}
