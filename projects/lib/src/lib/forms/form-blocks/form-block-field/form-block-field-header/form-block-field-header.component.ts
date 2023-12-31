import { Component, HostBinding, Input, OnInit } from '@angular/core';

export type FormBlockFieldHeaderAppearance = 'default' | 'bordered';

@Component({
  selector: 'ce-form-block-field-header',
  templateUrl: './form-block-field-header.component.html',
  styleUrls: ['./form-block-field-header.component.scss']
})
export class FormBlockFieldHeaderComponent implements OnInit {

  @Input()
  @HostBinding('class')
  appearance: FormBlockFieldHeaderAppearance = 'default';

  constructor() { }

  ngOnInit(): void {}

}
