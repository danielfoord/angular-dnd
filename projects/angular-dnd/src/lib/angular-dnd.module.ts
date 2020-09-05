import { NgModule } from '@angular/core';
import { AngularDndComponent } from './angular-dnd.component';
import { DraggableDirective } from './draggable.directive';
import { DraggableContainerDirective } from './draggable.container.directive';


@NgModule({
  imports: [],
  declarations: [
    AngularDndComponent,
    DraggableDirective,
    DraggableContainerDirective
  ],
  exports: [
    AngularDndComponent,
    DraggableDirective,
    DraggableContainerDirective
  ]
})
export class AngularDndModule { }
