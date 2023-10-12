import { Component, Input } from '@angular/core';
import { FormBlockFieldHeaderAppearance } from './form-block-field-header/form-block-field-header.component';

@Component({
  selector: 'ce-form-block-field',
  templateUrl: './form-block-field.component.html',
  styleUrls: ['./form-block-field.component.scss']
})
export class FormBlockFieldComponent {

  @Input()
  headerAppearance?: FormBlockFieldHeaderAppearance;

  @Input() label: string;
}


