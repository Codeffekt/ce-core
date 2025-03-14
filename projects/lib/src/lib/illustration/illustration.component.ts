import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ce-illustration',
    templateUrl: './illustration.component.html',
    styleUrls: [],
    standalone: false
})
export class CeIllustrationComponent implements OnInit {

  @Input() width?: string;

  @Input() height?: string;

  @Input() src!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
