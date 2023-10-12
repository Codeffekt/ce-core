import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { FormIndexPageComponent } from './form-index-page/form-index-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  CeFormModule, CeGridModule,
  CeNavigationModule, CeSideMenuModule
} from '@codeffekt/ce-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTextPageComponent } from './form-text-page/form-text-page.component';
import { FormNumberPageComponent } from './form-number-page/form-number-page.component';
import { FormSelectPageComponent } from './form-select-page/form-select-page.component';
import { FormTimestampPageComponent } from './form-timestamp-page/form-timestamp-page.component';
import { FormBarcodePageComponent } from './form-barcode-page/form-barcode-page.component';
import { FormCoordinatesPageComponent } from './form-coordinates-page/form-coordinates-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    FormIndexPageComponent,
    FormTextPageComponent,
    FormNumberPageComponent,
    FormSelectPageComponent,
    FormTimestampPageComponent,
    FormBarcodePageComponent,
    FormCoordinatesPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlocksRoutingModule,
    MatSidenavModule,
    CeSideMenuModule,
    CeGridModule,
    CeNavigationModule,
    CeFormModule,
  ]
})
export class BlocksModule { }
