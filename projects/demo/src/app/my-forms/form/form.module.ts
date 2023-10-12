import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import {
  CeFormDataService, CeFormEditorModule,
  CeFormRouteResolver,
  CeProjectFormRouteResolver
} from '@codeffekt/ce-core';
import { FormDataService } from './form-data.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormRoutingModule,
    CeFormEditorModule,
  ],
  providers: [
    {
      provide: CeFormDataService,
      useClass: FormDataService
    },
    {
      provide: CeFormRouteResolver,
      useClass: CeProjectFormRouteResolver,
    }
  ]
})
export class FormModule { }
