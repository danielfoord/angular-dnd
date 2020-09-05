import { Directive, ElementRef, HostListener } from '@angular/core';
import { DraggableService } from './draggable.service';


@Directive({
  selector: '[libDraggable]'
})
export class DraggableDirective {

  private ghostNode: Element;
  private fakeGhost: Element;

  private get ghostElement(): HTMLElement {
    return this.ghostNode as HTMLElement;
  }

  constructor(public elementRef: ElementRef, private draggableService: DraggableService) {
    this.elementRef.nativeElement.style.cursor = 'move';
    this.elementRef.nativeElement.draggable = true;
    this.elementRef.nativeElement.classList.add('draggable');
  }

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent) {
    // TODO: Throttle this
    const { sourceOriginXOffset, sourceOriginYOffset } = this.draggableService.getDraggablePosition();
    this.ghostElement.style.top = `${event.clientY - sourceOriginYOffset}px`;
    this.ghostElement.style.left = `${event.clientX - sourceOriginXOffset}px`;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {

    const { top, height, left, width } = this.elementRef.nativeElement.getBoundingClientRect();
    const centerY = top + (height * .5);
    const centerX = left + (width * .5);
    this.draggableService.setDraggablePosition({
      sourceOriginX: event.clientX - centerX,
      sourceOriginY: event.clientY - centerY,
      sourceOriginXOffset: event.clientX - left,
      sourceOriginYOffset: event.clientY - top,
    });

    // Placeholder styling
    this.elementRef.nativeElement.classList.add('dragging');
    this.elementRef.nativeElement.style.opacity = 0.3;

    // Fake a ghost element so we can use a custom one
    this.fakeGhost = document.createElement('div');
    event.dataTransfer.setDragImage(this.fakeGhost, 0, 0);

    // Custom ghost node
    this.ghostNode = this.elementRef.nativeElement.cloneNode(true);
    this.ghostElement.style.position = 'fixed';
    this.ghostElement.style.opacity = '1';
    this.ghostElement.style.top = `${top}px`;
    this.ghostElement.style.left = `${left}px`;
    this.ghostElement.style.pointerEvents = 'none';
    this.ghostElement.style.boxShadow = '0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2)';
    this.ghostElement.style.transform = 'rotate(3deg)';
    document.querySelector('body').appendChild(this.ghostElement);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(_: DragEvent) {
    this.elementRef.nativeElement.classList.remove('dragging');
    this.elementRef.nativeElement.style.opacity = 1;
    this.ghostNode.parentNode.removeChild(this.ghostNode);
    this.fakeGhost = null;
  }
}
