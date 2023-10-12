import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFormsRoutingModule } from './my-forms-routing.module';
import { MyFormsComponent } from './my-forms/my-forms.component';
import {
  CeFormsPipesModule, CeListModule,
  CeMainPageModule, CeNavigationModule,
  CePipesModule, CeSideMenuModule
} from '@codeffekt/ce-core';

@NgModule({
  declarations: [
    MyFormsComponent
  ],
  imports: [
    CommonModule,
    MyFormsRoutingModule,
    CeMainPageModule,
    CeNavigationModule,
    CeListModule,
    CeSideMenuModule,
    CePipesModule,
    CeFormsPipesModule,
  ],
  providers: [

  ]
})
export class MyFormsModule { }
