import { Directive, HostListener, ElementRef } from '@angular/core';
import { DraggableService } from './draggable.service';

@Directive({
  selector: '[libDraggableContainer]'
})
export class DraggableContainerDirective {

  constructor(private elementRef: ElementRef, private draggableService: DraggableService) { }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    const draggableElements = [...this.elementRef.nativeElement.querySelectorAll('.draggable')];
    const draggable = document.querySelector('.dragging');
    const { sourceOriginX, sourceOriginY } = this.draggableService.getDraggablePosition();
    const afterElement = this.getDraggableAfterElement(draggable, event.clientX - sourceOriginX, event.clientY - sourceOriginY);

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

  private getDraggableAfterElement(source: Element, sourceCenterX: number, sourceCenterY: number) {
    const sourceRect = source.getBoundingClientRect();
    const sourceTop = sourceCenterY - (sourceRect.height / 2);
    const sourceLeft = sourceCenterX - (sourceRect.width / 2);
    const sourceBottom = sourceCenterY + (sourceRect.height / 2);
    const sourceRight = sourceCenterX + (sourceRect.width / 2);

    const draggableElements = [...this.elementRef.nativeElement.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.find((target) => {
      // Check if source's center is inside the target's bounds 
      // If source is larger or equal to target
      const { height, width, left, top, right, bottom } = target.getBoundingClientRect();
      const targetCenterY = top + (height / 2);
      const targetCenterX = left + (width / 2);

      if (sourceRect.height >= height
        ? this.isInsideClientRect(left, right, top, bottom, sourceCenterX, sourceCenterY)
        : this.isInsideClientRect(sourceLeft, sourceRight, sourceTop, sourceBottom, targetCenterX, targetCenterY)) {
        return true;
      }
      return false;
    });
  }

  private isInsideClientRect(left: number, right: number, top: number, bottom: number, x: number, y: number) {
    return y >= top && y <= bottom && x >= left && x <= right;
  }

}
