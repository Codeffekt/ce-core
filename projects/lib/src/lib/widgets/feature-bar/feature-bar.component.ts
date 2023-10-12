import { Component, HostBinding, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ce-feature-bar',
  templateUrl: './feature-bar.component.html',
  styleUrls: ['./feature-bar.component.scss'],
})
export class FeatureBarComponent {
  @Input() alignment: 'start' | 'center' | 'end' = 'center';

  @HostBinding('class.align-start') get isAlignLeft() { return this.alignment === 'start'; }
  @HostBinding('class.align-center') get isAlignCenter() { return this.alignment === 'center'; }
  @HostBinding('class.align-end') get isAlignEnd() { return this.alignment === 'end'; }
}