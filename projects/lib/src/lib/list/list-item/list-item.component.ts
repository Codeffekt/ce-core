import { Component, HostBinding, Input, OnInit } from '@angular/core';
@Component({
  selector: 'ce-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent<T = any> implements OnInit {
  
  @Input()
  @HostBinding('class.active') active: boolean = false;  

  @Input()
  @HostBinding('class.selectable') selectable: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
