import { Component, OnInit } from '@angular/core';
import { CeFormComponent } from '@codeffekt/ce-core';

@Component({
    selector: 'app-form-barcode-page',
    templateUrl: './form-barcode-page.component.html',
    styleUrls: ['./form-barcode-page.component.scss'],
    imports: [
      CeFormComponent,
    ]
})
export class FormBarcodePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
