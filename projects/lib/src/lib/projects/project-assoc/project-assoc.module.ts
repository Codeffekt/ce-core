import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CeProjectAssocRoutingModule } from './project-assoc-routing.module';
import { CeProjectAssocComponent } from './project-assoc/project-assoc.component';
import { RouterModule } from '@angular/router';
import { CeNavigationModule } from '../../navigation/navigation.module';
import { CeListModule } from '../../list/list.module';
import { CeFormQueryWrapperModule } from '../../formquery-wrapper';
import { CeFormStoreService } from '../../forms/form/form-store.service';
import { CeFormDataService } from '../../forms/form-data.service';
import { CeFormRouteResolver } from '../../forms/form-route.resolver';
import { CeProjectFormRouteResolver } from '../project-form/project-form-route.resolver';
import { CeLayoutModule } from '../../layout';
import { ProjectAssocFactoryComponent } from './project-assoc-factory/project-assoc-factory.component';
import { ProjectAssocDefaultComponent } from './project-assoc-default/project-assoc-default.component';
import { ProjectAssocStoreService } from './project-assoc-store.service';
import { CeFormCardModule } from '../../forms/form-card/form-card.module';
import { FormAssoc } from '../../models/FormAssoc';
import { NavigationItemStoreService } from '../../navigation/navigation-item-factory/navigation-item-store.service';
import { FormBlock, FormWrapper } from '@codeffekt/ce-core-data';

@NgModule({
  declarations: [
    CeProjectAssocComponent,
    ProjectAssocFactoryComponent,
    ProjectAssocDefaultComponent,
  ],
  imports: [
    CommonModule,
    CeProjectAssocRoutingModule,
    CeNavigationModule,
    CeListModule,
    RouterModule,
    CeFormQueryWrapperModule,
    CeFormCardModule,
    CeLayoutModule
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
  constructor(
    storeService: ProjectAssocStoreService,
    formStore: CeFormStoreService,
    navItemStore: NavigationItemStoreService,
  ) {
    storeService.setDefaultComponent(ProjectAssocDefaultComponent);
    formStore.setComponents({
      [FormAssoc.ROOT]: CeProjectAssocComponent
    });
    navItemStore.setComponents({
      [FormAssoc.ROOT]: {
        useFunction: (wrapper: FormWrapper) => {
          const block: FormBlock = FormWrapper.getFormValue("assoc", wrapper.core);
          return navItemStore.getComponentType(FormWrapper.fromForm({
            id: block.field,
            ctime: wrapper.core.ctime,
            root: block.field,
            title: block.label,
            valid: true,
            content: {}
          }));
        }
      }
    })
  }
}
