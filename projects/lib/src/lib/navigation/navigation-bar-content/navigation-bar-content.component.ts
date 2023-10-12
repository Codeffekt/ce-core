import { Component, HostBinding, Input } from '@angular/core';

// export type NavigationBarContentAlignment = 'start' | 'center' | 'end';

@Component({
  selector: 'ce-navbar-content',
  templateUrl: './navigation-bar-content.component.html',
  styleUrls: ['./navigation-bar-content.component.scss']
})
export class NavigationBarContentComponent {

  // @Input() alignment: NavigationBarContentAlignment = 'start';

  // @HostBinding('class.align-start') get isAlignLeft() { return this.alignment === 'start'; }
  // @HostBinding('class.align-center') get isAlignCenter() { return this.alignment === 'center'; }
  // @HostBinding('class.align-end') get isAlignEnd() { return this.alignment === 'end'; }
}
