import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[libDraggableContainer]'
})
export class DraggableContainerDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    const afterElement = this.getDraggableAfterElement(event.clientY);
    const draggable = document.querySelector('.dragging');
    
    if (afterElement == null) {
      this.elementRef.nativeElement.appendChild(draggable);
    } else {
      this.elementRef.nativeElement.insertBefore(draggable, afterElement);
    }
  }

  private getDraggableAfterElement(y: number) {
    const draggableElements = [...this.elementRef.nativeElement.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

}
