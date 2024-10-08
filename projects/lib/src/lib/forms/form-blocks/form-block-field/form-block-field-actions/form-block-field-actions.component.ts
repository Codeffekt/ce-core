import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ce-form-block-field-actions',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './form-block-field-actions.component.html',
  styleUrls: ['./form-block-field-actions.component.scss']
})
export class FormBlockFieldActionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
