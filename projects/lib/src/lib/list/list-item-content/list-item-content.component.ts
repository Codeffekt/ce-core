import { Component, EventEmitter, OnInit } from '@angular/core';
import { IListItemContent } from '../list-item-factory/list-item-models';

@Component({
  selector: 'ce-list-item-content',
  templateUrl: './list-item-content.component.html',
  styleUrls: ['./list-item-content.component.scss']
})
export class ListItemContentComponent<T> implements OnInit, IListItemContent {

  itemChangedEvent: EventEmitter<boolean>;
  item: T;

  constructor() { }

  ngOnInit(): void {
  }

}
