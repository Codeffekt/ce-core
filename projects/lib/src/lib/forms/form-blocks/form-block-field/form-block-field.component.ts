import { Component, Input } from '@angular/core';
import { FormBlockFieldHeaderAppearance, FormBlockFieldHeaderComponent } from './form-block-field-header/form-block-field-header.component';
import { CommonModule } from '@angular/common';
import { FormBlockFieldTitleComponent } from './form-block-field-title/form-block-field-title.component';
import { CeLayoutModule } from '../../../layout';

@Component({
    selector: 'ce-form-block-field',
    imports: [
        CommonModule,
        FormBlockFieldHeaderComponent,
        FormBlockFieldTitleComponent,
        CeLayoutModule,
    ],
    templateUrl: './form-block-field.component.html',
    styleUrls: ['./form-block-field.component.scss']
})
export class FormBlockFieldComponent {

  @Input()
  headerAppearance: FormBlockFieldHeaderAppearance = 'default';

  @Input() label!: string;
}


