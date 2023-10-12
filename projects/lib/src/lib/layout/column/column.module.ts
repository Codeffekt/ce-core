import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './column.component';

@NgModule({
  declarations: [
    ColumnComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ColumnComponent
  ]
})
export class CeColumnModule { }
