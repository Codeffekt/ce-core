import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'ce-list-item-actions',
    templateUrl: './list-item-actions.component.html',
    styleUrls: ['./list-item-actions.component.scss'],
    imports: [
      CommonModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule,
    ],
})
export class ListItemActionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
}
