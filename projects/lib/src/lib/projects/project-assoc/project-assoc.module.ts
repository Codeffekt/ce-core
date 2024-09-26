import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CeProjectAssocRoutingModule } from './project-assoc-routing.module';
import { RouterModule } from '@angular/router';
import { CeFormDataService } from '../../forms/form-data.service';
import { CeFormRouteResolver } from '../../forms/form-route.resolver';
import { CeProjectFormRouteResolver } from '../project-form/project-form-route.resolver';

@NgModule({
  declarations: [        
  ],
  imports: [
    CommonModule,
    CeProjectAssocRoutingModule,     
    RouterModule,   
  ],
  providers: [
    {
      provide: CeFormDataService,
      useClass: CeFormDataService
    },
    {
      provide: CeFormRouteResolver,
      useClass: CeProjectFormRouteResolver,
    },
  ]
})
export class CeProjectAssocModule {  
}
