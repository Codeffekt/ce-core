import { Component, Input } from '@angular/core';
import { FormBlockFieldHeaderAppearance, FormBlockFieldHeaderComponent } from './form-block-field-header/form-block-field-header.component';
import { CommonModule } from '@angular/common';
import { CeGridModule } from '../../../layout/grid/grid.module';
import { FormBlockFieldTitleComponent } from './form-block-field-title/form-block-field-title.component';

@Component({
  selector: 'ce-form-block-field',
  standalone: true,
  imports: [
    CommonModule,
    FormBlockFieldHeaderComponent,
    FormBlockFieldTitleComponent,
    CeGridModule,
  ],
  templateUrl: './form-block-field.component.html',
  styleUrls: ['./form-block-field.component.scss']
})
export class FormBlockFieldComponent {

  @Input()
  headerAppearance?: FormBlockFieldHeaderAppearance;

  @Input() label: string;
}


