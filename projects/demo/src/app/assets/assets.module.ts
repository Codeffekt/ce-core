import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { CeBookmarksModule, CeFormQueryWrapperModule, CeListModule } from '@codeffekt/ce-core';

@NgModule({
  declarations: [
    AssetsComponent
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,  
    CeFormQueryWrapperModule,        
    CeListModule,
  ]
})
export class AssetsModule { }
