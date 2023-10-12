import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IListItemContent } from '@codeffekt/ce-core';
import { PeriodicElement } from '../../../tables/table-wrapper-example/datasources/data';

@Component({
  selector: 'app-list-item-compound',
  templateUrl: './list-item-compound.component.html',
  styleUrls: ['./list-item-compound.component.scss']
})
export class ListItemCompoundComponent implements OnInit, IListItemContent {

  @Input() item: PeriodicElement;
  itemChangedEvent: EventEmitter<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

}
