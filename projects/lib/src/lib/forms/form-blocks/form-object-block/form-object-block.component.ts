import { Component } from '@angular/core';
import { FormBlockComponent } from '../form-block/form-block.component';
import { FormBlockObject } from '@codeffekt/ce-core-data';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-form-object-block',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './form-object-block.component.html',
  styleUrl: './form-object-block.component.scss'
})
export class FormObjectBlockComponent extends FormBlockComponent<FormBlockObject> {

  isEditMode = false;

  updateValue(newValue: string) {
    if (newValue !== this.value) {
      this.value = newValue;     
    }        
  }

}
