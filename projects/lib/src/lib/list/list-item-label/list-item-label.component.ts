import { Component, Input, OnInit } from '@angular/core';

export type ListItemLabelSize = 'small' | 'medium';

@Component({
  selector: 'ce-list-item-label',
  templateUrl: './list-item-label.component.html',
  styleUrls: ['./list-item-label.component.scss']
})
export class ListItemLabelComponent implements OnInit {

  @Input() size: ListItemLabelSize = 'medium';

  constructor() { }

  ngOnInit(): void {
  }

}
