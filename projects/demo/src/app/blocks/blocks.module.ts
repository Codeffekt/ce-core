import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  CeFormModule, CeGridModule,
  CeNavigationModule, CeSideMenuModule
} from '@codeffekt/ce-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainPageComponent,                       
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
