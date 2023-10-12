import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowComponent } from './row.component';
import { RowFillDirective } from './row.directive';

@NgModule({
  declarations: [
    RowComponent,
    RowFillDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RowComponent,
    RowFillDirective
  ]
})
export class CeRowModule { }
