import { Component } from '@angular/core';
import { FormBlockComponent } from '../form-block/form-block.component';

@Component({
  selector: 'ce-form-boolean-block',
  templateUrl: './form-boolean-block.component.html',
  styleUrls: ['./form-boolean-block.component.scss']
})
export class FormBooleanBlockComponent extends FormBlockComponent<boolean> {
}
