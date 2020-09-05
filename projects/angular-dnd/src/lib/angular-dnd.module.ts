import { NgModule } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DraggableContainerDirective } from './draggable.container.directive';


@NgModule({
  imports: [],
  declarations: [
    DraggableDirective,
    DraggableContainerDirective
  ],
  exports: [
    DraggableDirective,
    DraggableContainerDirective
  ]
})
export class AngularDndModule { }
