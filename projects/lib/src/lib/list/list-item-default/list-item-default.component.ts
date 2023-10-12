import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBlock } from '@codeffekt/ce-core-data';
import { IListItemContent } from '../list-item-factory/list-item-models';

@Component({
  selector: 'lib-list-item-default',
  templateUrl: './list-item-default.component.html',
  styleUrls: ['./list-item-default.component.scss']
})
export class ListItemDefaultComponent implements OnInit, IListItemContent {

  itemChangedEvent?: EventEmitter<boolean>;
  item: any;
  block?: FormBlock;

  constructor() { }  

  ngOnInit(): void {
  }

}
