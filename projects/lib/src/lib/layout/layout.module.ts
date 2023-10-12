import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CeColumnModule } from './column';
import { CeGridModule } from './grid';
import { CeOverflowModule } from './overflow';
import { CePaddingModule } from './padding';
import { CeRowModule } from './row';
import { CeMarginModule } from './margin';
import { CeAlignModule } from './align';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CeColumnModule,
    CeGridModule,
    CeOverflowModule,
    CePaddingModule,
    CeRowModule,
    CeMarginModule,
    CeAlignModule
  ]
})
export class CeLayoutModule { }
