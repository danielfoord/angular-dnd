import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[libDraggableContainer]'
})
export class DraggableContainerDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    const draggableElements = [...this.elementRef.nativeElement.querySelectorAll('.draggable')];
    const afterElement = this.getDraggableAfterElement(event.clientX, event.clientY);
    const draggable = document.querySelector('.dragging');

    const draggableIndex = draggableElements.indexOf(draggable);
    const afterIndex = draggableElements.indexOf(afterElement);

    // No element after the position we are trying to insert
    if (!afterElement) {
      // Make sure we are adding to the back of the collection, or we are adding to an empty collection
      if (draggableIndex + 1 === draggableElements.length || draggableIndex === -1) {
        this.elementRef.nativeElement.appendChild(draggable);
      }
      return;
    }

    if (draggableIndex > afterIndex) {
      this.elementRef.nativeElement.insertBefore(draggable, afterElement);
    } else {
      this.elementRef.nativeElement.insertBefore(draggable, afterElement.nextSibling);
    }
  }

  private getDraggableAfterElement(x: number, y: number) {
    const draggableElements = [...this.elementRef.nativeElement.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      if (this.isInsideClientRect(child, x, y)) {
        return { element: child };
      } else {
        return closest;
      }
    }, {}).element;
  }

  private isInsideClientRect(element: HTMLElement, x: number, y: number) {
    const { top, bottom, left, right } = element.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right;
  }

}
