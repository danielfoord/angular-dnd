import { Directive, ElementRef, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DraggableService } from './draggable.service';
import { Subject, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DraggableContainerDirective } from './draggable.container.directive';

const moveItemInArray = (array: any[], sourceIndex: number, targetIndex: number): void => {
  if (!array || array.length === 0) {
    return;
  }

  while (sourceIndex < 0) {
    sourceIndex += array.length;
  }
  while (targetIndex < 0) {
    targetIndex += array.length;
  }
  if (targetIndex >= array.length) {
    var k = targetIndex - array.length;
    while ((k--) + 1) {
      array.push(undefined);
    }
  }
  array.splice(targetIndex, 0, array.splice(sourceIndex, 1)[0]);
};

@Directive({
  selector: '[libDraggable]'
})
export class DraggableDirective implements OnInit {

  @Input()
  data: any[];

  @Output()
  onDrop: EventEmitter<void> = new EventEmitter();

  sourceIndex: number;

  targetIndex: number;

  sourceData: any[];

  dragging = false;

  parent: DraggableContainerDirective;

  private ghostNode: Element;
  private fakeGhost: Element;
  private onDragSubject: Subject<DragEvent> = new Subject();

  private get $onDrag(): Observable<DragEvent> {
    return this.onDragSubject.asObservable().pipe(
      throttleTime(7) // 144ish frames per second
    );
  }

  private get ghostElement(): HTMLElement {
    return this.ghostNode as HTMLElement;
  }

  constructor(public elementRef: ElementRef, private draggableService: DraggableService) {
    this.elementRef.nativeElement.style.cursor = 'move';
    this.elementRef.nativeElement.draggable = true;
    this.elementRef.nativeElement.classList.add('dnd-draggable');
  }

  ngOnInit(): void {
    this.$onDrag.subscribe((event: DragEvent) => {
      const { sourceOriginXOffset, sourceOriginYOffset } = this.draggableService.getDraggablePosition();
      this.ghostElement.style.top = `${event.clientY - sourceOriginYOffset}px`;
      this.ghostElement.style.left = `${event.clientX - sourceOriginXOffset}px`;
    });
  }

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent) {
    this.onDragSubject.next(event);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    this.dragging = true;
    this.sourceIndex = this.parent.draggableElements.indexOf(this.elementRef.nativeElement);
    this.sourceData = this.parent.data;

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
    this.elementRef.nativeElement.classList.add('dnd-dragging');
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
    this.ghostElement.style.width = `${width}px`;
    this.ghostElement.style.zIndex = '100';
    document.querySelector('body').appendChild(this.ghostElement);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(_: DragEvent) {
    this.dragging = false;
    this.elementRef.nativeElement.classList.remove('dnd-dragging');
    this.elementRef.nativeElement.style.opacity = 1;
    this.ghostNode.parentNode.removeChild(this.ghostNode);
    this.fakeGhost = null;
    moveItemInArray(this.sourceData, this.sourceIndex, this.targetIndex);
    this.onDrop.next();
  }
}
