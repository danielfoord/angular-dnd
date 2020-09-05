import { NgModule } from '@angular/core';
import { AngularDndComponent } from './angular-dnd.component';
import { DraggableDirective } from './draggable.directive';


@NgModule({
  declarations: [AngularDndComponent, DraggableDirective],
  imports: [
  ],
  exports: [AngularDndComponent, DraggableDirective]
})
export class AngularDndModule { }
