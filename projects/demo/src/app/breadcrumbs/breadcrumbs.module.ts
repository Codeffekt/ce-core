import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsRoutingModule } from './breadcrumbs-routing.modules';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CeLayoutModule, CeNavigationModule } from '@codeffekt/ce-core';


@NgModule({
  declarations: [
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbsRoutingModule,
    CeNavigationModule,
    CeLayoutModule,
  ]
})
export class BreadcrumbsModule { }
