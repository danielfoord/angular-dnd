import { Directive, HostListener, ElementRef, Input, QueryList, ContentChildren, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { DraggableService } from './draggable.service';
import { DraggableDirective, DndDropEvent } from './draggable.directive';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[dndDraggableContainer]'
})
export class DraggableContainerDirective implements AfterContentInit {

  @Input()
  data: any[];

  @Output()
  dataChange: EventEmitter<any[]> = new EventEmitter();

  @ContentChildren(DraggableDirective)
  draggables: QueryList<DraggableDirective>;

  private onDropSubscription: Subscription;

  public get draggableElements(): Array<Element> {
    return [...this.elementRef.nativeElement.querySelectorAll('.dnd-draggable')];
  }

  constructor(public elementRef: ElementRef, private draggableService: DraggableService) {
    this.elementRef.nativeElement.style.pointerEvents = '';
  }

  ngAfterContentInit(): void {
    this.draggables.forEach(d => d.parent = this);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();

    // TODO: This should be searched for in the parent of this directive (DraggableContextDirective)
    const draggable = this.draggables.find(d => d.dragging);

    if (!draggable) {
      return;
    }

    if (!this.onDropSubscription) {
      this.onDropSubscription = draggable.onDrop.subscribe((event: DndDropEvent) => {
        this.onDropSubscription.unsubscribe();
        this.onDropSubscription = null;
        this.dataChange.emit(event.updatedDataSource);
      });  
    }

    const draggableElement = draggable.elementRef.nativeElement;

    const { sourceOriginX, sourceOriginY } = this.draggableService.getDraggablePosition();
    const afterElement = this.getDraggableAfterElement(draggableElement, event.clientX - sourceOriginX, event.clientY - sourceOriginY);

    const draggableIndex = this.draggableElements.indexOf(draggableElement);
    const afterIndex = this.draggableElements.indexOf(afterElement);

    // No element after the position we are trying to insert
    if (!afterElement) {
      // Make sure we are adding to the back of the collection, or we are adding to an empty collection
      if (draggableIndex + 1 === this.draggableElements.length || draggableIndex === -1) {
        this.elementRef.nativeElement.appendChild(draggableElement);
      }
      return;
    }

    if (draggableIndex > afterIndex) {
      this.elementRef.nativeElement.insertBefore(draggableElement, afterElement);
    } else {
      this.elementRef.nativeElement.insertBefore(draggableElement, afterElement.nextSibling);
    }

    draggable.targetIndex = afterIndex;
  }

  private getDraggableAfterElement(source: Element, sourceCenterX: number, sourceCenterY: number) {
    const sourceRect = source.getBoundingClientRect();
    const sourceTop = sourceCenterY - (sourceRect.height / 2);
    const sourceLeft = sourceCenterX - (sourceRect.width / 2);
    const sourceBottom = sourceCenterY + (sourceRect.height / 2);
    const sourceRight = sourceCenterX + (sourceRect.width / 2);

    const draggableElements = [...this.elementRef.nativeElement.querySelectorAll('.dnd-draggable:not(.dnd-dragging)')];
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
