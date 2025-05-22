import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ce-form-card',
    templateUrl: './form-card.component.html',
    styleUrls: ['./form-card.component.scss'], 
    imports: [
      CommonModule,
    ]  
})
export class FormCardComponent {

  @Input()
  hasError!: boolean;  

}
