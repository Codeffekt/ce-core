import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CeOverflowAutoDirective, CeOverflowXAutoDirective } from './overflow.directive';

@NgModule({
  declarations: [
    CeOverflowAutoDirective,
    CeOverflowXAutoDirective
  ],
  imports: [
    CommonModule
  ], exports: [
    CeOverflowAutoDirective,
    CeOverflowXAutoDirective
  ]
})
export class CeOverflowModule { }
