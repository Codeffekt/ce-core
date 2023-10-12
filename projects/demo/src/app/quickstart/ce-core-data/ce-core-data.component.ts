import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ce-core-data',
  templateUrl: './ce-core-data.component.html',
  styleUrls: ['./ce-core-data.component.scss']
})
export class CeCoreDataComponent implements OnInit {

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
