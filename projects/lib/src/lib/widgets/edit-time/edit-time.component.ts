
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ce-edit-time',
  templateUrl: './edit-time.component.html',
  styleUrls: ['./edit-time.component.scss']
})
export class EditTimeComponent implements OnInit {

  @Input() mTime!: number;
  @Input() saving!: boolean;

  constructor() {  }

  ngOnInit(): void {}

}
