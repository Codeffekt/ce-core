import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ce-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {

  @Input()
  hasError: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
