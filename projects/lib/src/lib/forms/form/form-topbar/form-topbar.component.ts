import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'lib-form-topbar',
  templateUrl: './form-topbar.component.html',
  styleUrls: ['./form-topbar.component.scss']
})
export class FormTopbarComponent {

  @Input() formWrapper!: FormWrapper;
  @Output() formChanges = new EventEmitter<FormWrapper>();

}
