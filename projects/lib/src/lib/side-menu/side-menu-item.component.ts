import { Component, Input } from '@angular/core';

@Component({
  selector: 'ce-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss']
})
export class CeSideMenuItemComponent {

  @Input() icon!: string;
  @Input() fontIcon!: string;
  @Input() label!: string;
}
