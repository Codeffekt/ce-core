import { Component, Input, OnInit } from '@angular/core';
import { FormProjectWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'ce-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class CeProjectSelectorComponent implements OnInit {


  @Input() project!: FormProjectWrapper;

  constructor() { }

  ngOnInit(): void {
  }

}
