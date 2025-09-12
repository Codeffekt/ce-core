import { Component, OnInit } from '@angular/core';
import { CeFormComponent } from '@codeffekt/ce-core';

@Component({
    selector: 'app-form-coordinates-page',
    templateUrl: './form-coordinates-page.component.html',
    styleUrls: ['./form-coordinates-page.component.scss'],
    imports: [
      CeFormComponent,
    ]
})
export class FormCoordinatesPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
