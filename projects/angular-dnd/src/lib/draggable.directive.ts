import { Directive, ElementRef, HostListener } from '@angular/core';
import { DraggableService } from './draggable.service';

@Directive({
  selector: '[libDraggable]',

})
export class DraggableDirective {

  x: number;
  y: number;

  constructor(public elementRef: ElementRef, private draggableService: DraggableService) {
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
    let { top, height, left, width } = this.elementRef.nativeElement.getBoundingClientRect();
    top = top + (height * .5);
    left = left + (width * .5);
    this.draggableService.setDraggablePosition(event.clientX - left, event.clientY - top );
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(_: DragEvent) {
    this.elementRef.nativeElement.classList.remove('dragging');
    this.elementRef.nativeElement.style.opacity = 1;
  }
}
