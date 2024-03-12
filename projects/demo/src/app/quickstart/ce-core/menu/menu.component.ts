import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() formWrapper: FormWrapper;
  @Output() formChanges = new EventEmitter<FormWrapper>();

}
