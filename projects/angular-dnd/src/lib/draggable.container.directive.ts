import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[libDraggableContainer]'
})
export class DraggableContainerDirective {

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    const draggable = document.querySelector('.dragging');
    this.elementRef.nativeElement.appendChild(draggable);
  }

  constructor(private elementRef: ElementRef) { }

}
