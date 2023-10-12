import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-example',
  templateUrl: './section-example.component.html',
  styleUrls: ['./section-example.component.scss']
})
export class SectionExampleComponent implements OnInit {

  @Input() title?: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
