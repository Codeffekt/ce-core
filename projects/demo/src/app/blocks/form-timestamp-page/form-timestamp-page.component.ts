import { Component, OnInit } from '@angular/core';
import { CeFormComponent } from '@codeffekt/ce-core';

@Component({
    selector: 'app-form-timestamp-page',
    templateUrl: './form-timestamp-page.component.html',
    styleUrls: ['./form-timestamp-page.component.scss'],
    imports: [
      CeFormComponent,
    ]
})
export class FormTimestampPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
