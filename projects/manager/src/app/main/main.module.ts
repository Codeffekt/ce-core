import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { CePlotlyModule } from '@codeffekt/ce-form-plotly';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CePlotlyModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
