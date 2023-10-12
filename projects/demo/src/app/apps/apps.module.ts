import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { AppsComponent } from './apps.component';

import { 
  CeFormsModule, CeFormsPipesModule, 
  CeListModule, CeMainPageModule, CeNavigationModule, 
  CePipesModule, CeSideMenuModule, CeWidgetsModule } from '@codeffekt/ce-core';
import { SharedModule } from '../shared/shared.module';
import { PortalModule } from '@angular/cdk/portal';


@NgModule({
  declarations: [
    AppsComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    PortalModule,
    CeWidgetsModule,
    CePipesModule,  
    CeFormsModule,
    CeListModule,  
    CeNavigationModule,
    CeFormsPipesModule,
    CeSideMenuModule,
    CeMainPageModule,
    SharedModule,
  ],  
})
export class AppsModule { }
