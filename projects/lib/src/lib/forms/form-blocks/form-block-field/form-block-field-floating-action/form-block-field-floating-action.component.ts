import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ce-form-block-field-floating-action',
    templateUrl: './form-block-field-floating-action.component.html',
    styleUrls: ['./form-block-field-floating-action.component.scss'],
    imports: [
      CommonModule,
    ],
    standalone: true,
})
export class FormBlockFieldFloatingActionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
