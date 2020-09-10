import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  items: number[];

  ngOnInit(): void {
    this.items = [...Array(12).keys()];
    console.debug(this);
  }

}