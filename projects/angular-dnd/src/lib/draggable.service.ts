import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DraggableService {

  x: number;
  y: number;

  setDraggablePosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getDraggablePosition(): { x: number, y: number } {
    return { x: this.x, y: this.y };
  }
}