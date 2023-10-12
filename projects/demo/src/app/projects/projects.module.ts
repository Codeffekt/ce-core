import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AppMainRoutingModule,
} from '@codeffekt/ce-core';
import { CeFormCoordinatesModule } from '@codeffekt/ce-form-coordinates';
import { CeBarcodeModule } from '@codeffekt/ce-barcode';
@NgModule({
  imports: [
    CommonModule,
    // CeProjectMainModule,      
    AppMainRoutingModule,
    CeFormCoordinatesModule,
    CeBarcodeModule,

  ],
})
export class ProjectsModule { }
