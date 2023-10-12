import { Component, OnInit } from '@angular/core';
import { FormBlock } from '@codeffekt/ce-core-data';

@Component({
  selector: 'lib-table-cell-default',
  templateUrl: './table-cell-default.component.html',
  styleUrls: ['./table-cell-default.component.scss']
})
export class TableCellDefaultComponent implements OnInit {

  block: FormBlock;

  constructor() { }

  ngOnInit(): void {
  }

}
