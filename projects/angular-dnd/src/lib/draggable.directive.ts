import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[libDraggable]'
})
export class DraggableDirective {

  @HostListener('dragstart', ['$event'])
  onDragStart(_: DragEvent) {
    this.elementRef.nativeElement.classList.add('dragging');
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(_: DragEvent) {
    this.elementRef.nativeElement.classList.remove('dragging');
  }

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.cursor = 'move';
    this.elementRef.nativeElement.draggable = true;
  }

}
