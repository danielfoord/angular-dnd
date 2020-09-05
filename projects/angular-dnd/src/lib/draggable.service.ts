import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DraggableService {

  sourceOriginX: number;
  sourceOriginY: number;
  sourceOriginXOffset: number;
  sourceOriginYOffset: number;

  setDraggablePosition(obj: {sourceOriginX: number, sourceOriginY: number, sourceOriginXOffset: number, sourceOriginYOffset: number}) {
    this.sourceOriginX = obj.sourceOriginX;
    this.sourceOriginY = obj.sourceOriginY;
    this.sourceOriginXOffset = obj.sourceOriginXOffset;
    this.sourceOriginYOffset = obj.sourceOriginYOffset;
  }

  getDraggablePosition(): {sourceOriginX: number, sourceOriginY: number, sourceOriginXOffset: number, sourceOriginYOffset: number} {
    return { 
      sourceOriginX: this.sourceOriginX, 
      sourceOriginY: this.sourceOriginY, 
      sourceOriginXOffset: this.sourceOriginXOffset, 
      sourceOriginYOffset: this.sourceOriginYOffset  
    };
  }
}