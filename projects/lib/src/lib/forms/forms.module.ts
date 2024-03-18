import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CePipesModule } from '../pipes/pipes.module';
import { CE_FORMS_ROUTE_RESOLVER } from './forms-route.resolver';
import { CeDefaultFormsRouteResolver } from './resolvers/ce-default-forms-route.resolver';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { CeLayoutModule } from '../layout';
import { CeSideMenuModule } from '../side-menu/side-menu.module';
import { CeFormBlocksModule } from './form-blocks';
import { CeFormCardModule } from './form-card';
import { CeFormsTableModule } from './forms-table';
import { CeFormModule } from './form/form.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CeFormBlocksModule,
    CeFormCardModule,
    CeFormsTableModule,
    CeFormModule,
    CePipesModule,
    CeSideMenuModule,
    CeLayoutModule
  ],
  exports: [
    CeFormBlocksModule,
    CeFormCardModule,
    CeFormsTableModule,
    CeFormModule,
  ],
  providers: [
    { provide: CE_FORMS_ROUTE_RESOLVER, useClass: CeDefaultFormsRouteResolver },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: 'always',
        appearance: 'outline',
      }
    }
  ]
})
export class CeFormsModule {
  constructor() {    
  }
}
