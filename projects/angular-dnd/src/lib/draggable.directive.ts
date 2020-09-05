import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[libDraggable]',

})
export class DraggableDirective {

  x: number;
  y: number;

  constructor(public elementRef: ElementRef) {
    this.elementRef.nativeElement.style.cursor = 'move';
    this.elementRef.nativeElement.draggable = true;
    this.elementRef.nativeElement.classList.add('draggable');
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    // TODO: Clone node, add to DOM and position in the drag event
    // event.dataTransfer.setDragImage(this.elementRef.nativeElement, 0, 0);
    this.elementRef.nativeElement.classList.add('dragging');
    this.elementRef.nativeElement.style.opacity = 0.3;
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(_: DragEvent) {
    this.elementRef.nativeElement.classList.remove('dragging');
    this.elementRef.nativeElement.style.opacity = 1;
  }
}
