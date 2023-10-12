import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ce-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: []
})
export class CeIllustrationComponent implements OnInit {

  @Input() width?: string;

  @Input() height?: string;

  @Input() src!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
