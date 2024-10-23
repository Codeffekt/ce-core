import { Component, Input } from '@angular/core';

@Component({
  selector: 'ce-list-item-icon-prop',
  templateUrl: './list-item-icon-prop.component.html',
  styleUrls: ['./list-item-icon-prop.component.scss']
})
export class ListItemIconPropComponent {
  @Input() icon!: string;
  @Input() fontIcon!: string;
  @Input() tooltip!: string;
}

@Component({
  selector: 'ce-list-item-icon-prop-list',
  template: `<div class="d-flex flex-row"><ng-content select="ce-list-item-icon-prop"></ng-content></div>`,
  styleUrls: ['./list-item-icon-prop.component.scss']
})
export class ListItemIconPropListComponent { }