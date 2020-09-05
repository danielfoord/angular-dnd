import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularDndModule } from 'angular-dnd';
import { GridComponent } from './grid.component';
import { ListsComponent } from './lists.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDndModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
