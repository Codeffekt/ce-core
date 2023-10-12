import { Component, Input, OnInit } from '@angular/core';
import { IFormAutocompleteItemContent } from '../form-input-item-models';
import { FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'lib-form-input-autocomplete-item-default',
  templateUrl: './form-input-autocomplete-item-default.component.html',
  styleUrls: ['./form-input-autocomplete-item-default.component.css']
})
export class FormInputAutocompleteItemDefaultComponent implements OnInit, IFormAutocompleteItemContent {

  @Input() item!: FormWrapper;

  constructor() { }

  ngOnInit(): void {
  }

}
