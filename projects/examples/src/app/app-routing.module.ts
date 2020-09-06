import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './grid.component';
import { ListsComponent } from './lists.component';

const routes: Routes = [{
  path: 'lists',
  component: ListsComponent
}, {
  path: 'grid',
  component: GridComponent
}, {
  path: '',
  redirectTo: '/lists',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
