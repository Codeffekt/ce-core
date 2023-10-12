import { AfterViewInit, Component, ContentChild, Input } from '@angular/core';
import { ListHeaderComponent } from './list-header/list-header.component';

@Component({
  selector: 'ce-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent<T = any> implements AfterViewInit {

  @ContentChild(ListHeaderComponent) listHeader?: ListHeaderComponent;

  @Input() searchBox: boolean;
  @Input() paginator: boolean;

  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20];

  constructor() { }  

  ngAfterViewInit(): void {
    this.listHeader?.setSearchBox(this.searchBox);
  }  
}
