import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ce-form-block-field-content',
    imports: [
        CommonModule
    ],
    templateUrl: './form-block-field-content.component.html',
    styleUrls: ['./form-block-field-content.component.scss']
})
export class FormBlockFieldContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
