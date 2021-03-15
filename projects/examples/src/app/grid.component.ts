import { Component, OnInit } from '@angular/core';
import { DndDropEvent } from 'angular-dnd';

@Component({
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  items: number[];

  ngOnInit(): void {
    this.items = [...Array(12).keys()];
  }

  onItemDrop(event: DndDropEvent) {
    console.debug(event);
  }

}