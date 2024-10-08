import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ce-form-block-field-title',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './form-block-field-title.component.html',
  styleUrls: ['./form-block-field-title.component.scss']
})
export class FormBlockFieldTitleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
