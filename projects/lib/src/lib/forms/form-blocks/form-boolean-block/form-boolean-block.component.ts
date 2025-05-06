import { Component } from '@angular/core';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormBlock } from '@codeffekt/ce-core-data';

@Component({
    selector: 'ce-form-boolean-block',
    templateUrl: './form-boolean-block.component.html',
    styleUrls: ['./form-boolean-block.component.scss'],
    standalone: false
})
export class FormBooleanBlockComponent extends FormBlockComponent<FormBlock> {
}
