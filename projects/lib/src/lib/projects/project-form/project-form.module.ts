import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeProjectFormRoutingModule } from './project-form-routing.module';
import { CeProjectFormRouteResolver } from './project-form-route.resolver';
import { CeFormDataService } from '../../forms/form-data.service';
import { CeFormRouteResolver } from '../../forms/form-route.resolver';
import { CeFormsModule } from '../../forms/forms.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CeProjectFormRoutingModule,
    CeFormsModule    
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
export class CeProjectFormModule { }
