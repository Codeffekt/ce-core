import { Component, HostListener } from '@angular/core';
import { FormBlockComponent } from '../form-block/form-block.component';

@Component({
  selector: 'ce-form-number-block',
  templateUrl: './form-number-block.component.html',
  styleUrls: ['./form-number-block.component.scss']
})
export class FormNumberBlockComponent extends FormBlockComponent<number> {
  @HostListener('keypress', ['$event']) onKeyPress(event) {

    if (!this.formBlock.params) {
      return true;
    }

    if (this.formBlock.params.decimal != null && !this.formBlock.params.decimal) {
      return /[^(.|,)]/.test(event.key);
    }

    const digits = this.formBlock.params.digits;
    if (Number.isInteger(digits)) {
      const newValue = this.value != null ? `${this.value}${event.key}` : `${event.key}`;
      return new RegExp(`^\\d*(\\.|\\,)?\\d{0,${digits}}$`).test(newValue);
    }

    if (!this.formBlock.params.signed) {
      return /[^\-]/.test(event.key);
    }

    return true;
  }
}
