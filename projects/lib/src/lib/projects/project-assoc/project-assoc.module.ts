import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CeProjectAssocRoutingModule } from './project-assoc-routing.module';
import { CeProjectAssocComponent } from './project-assoc/project-assoc.component';
import { RouterModule } from '@angular/router';
import { CeNavigationModule } from '../../navigation/navigation.module';
import { CeListModule } from '../../list/list.module';
import { CeFormQueryWrapperModule } from '../../formquery-wrapper';
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
import { ProjectAssocNavComponent } from './project-assoc-nav/project-assoc-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { FormActionBuilder } from '../../forms/form/actions/form-action-builder';

@NgModule({
  declarations: [
    CeProjectAssocComponent,
    ProjectAssocFactoryComponent,
    ProjectAssocDefaultComponent,
    ProjectAssocNavComponent,
  ],
  imports: [
    CommonModule,
    CeProjectAssocRoutingModule,
    CeNavigationModule,
    CeListModule,
    RouterModule,
    CeFormQueryWrapperModule,
    CeFormCardModule,
    CeLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
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
    formActionService: FormActionService,
    navItemStore: NavigationItemStoreService,
  ) {
    storeService.setDefaultComponent(ProjectAssocDefaultComponent);    
    formActionService.setActions({
      [FormAssoc.ROOT]: FormActionBuilder.withRender(CeProjectAssocComponent)
    });

    navItemStore.setComponents({
      [FormAssoc.ROOT]: {
        useFunction: (wrapper: FormWrapper) => {
          const block: FormBlock = FormWrapper.getFormValue("assoc", wrapper.core);
          const assocForm = FormWrapper.fromForm({
            id: block.field,
            ctime: wrapper.core.ctime,
            root: `${block.field}`,
            title: block.label,
            valid: true,
            content: {}
          });
          const existingComponentType = navItemStore.getComponentType(assocForm, false);
          return existingComponentType ?? ProjectAssocNavComponent;
        }
      }
    })
  }
}
