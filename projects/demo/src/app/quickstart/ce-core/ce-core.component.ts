import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-ce-core',
  templateUrl: './ce-core.component.html',
  styleUrls: ['./ce-core.component.scss']
})
export class CeCoreComponent {

  @Input() formWrapper: FormWrapper;
  @Output() formChanges = new EventEmitter<FormWrapper>(); 

}
