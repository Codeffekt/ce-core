import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-ce-core-data',
  templateUrl: './ce-core-data.component.html',
  styleUrls: ['./ce-core-data.component.scss']
})
export class CeCoreDataComponent implements OnInit {

  @Input() formWrapper: FormWrapper;
  @Output() formChanges = new EventEmitter<FormWrapper>();

  formRootStr = `
  export interface CoreIndexElt {
    id: IndexType;
    ctime: number;
    mtime?: number;
  }

  export interface FormInstanceBase extends CoreIndexElt {
    title: string;
    content: {
        [field: string]: FormBlock;
    };
    table?: string;
    version?: FormVersion;
  }

  export type FormRoot = FormInstanceBase;
`;

  formInstanceStr = `  
  export interface FormInstance extends FormInstanceBase {
    valid: boolean;
    root: IndexType;
    author?: IndexType;
  }
`;

  constructor() { }

  ngOnInit(): void {
  }

}
