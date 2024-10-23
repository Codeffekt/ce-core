import { NgModule } from "@angular/core";
import { FormActionService } from "../../forms/form/actions/form-action.service";
import { FormAssoc } from "../../models/FormAssoc";
import { FormActionBuilder } from "../../forms/form/actions/form-action-builder";
import { CeProjectAssocComponent } from "./project-assoc/project-assoc.component";
import { ProjectAssocFactoryComponent } from "./project-assoc-factory/project-assoc-factory.component";
import { ProjectAssocDefaultComponent } from "./project-assoc-default/project-assoc-default.component";
import { ProjectAssocNavComponent } from "./project-assoc-nav/project-assoc-nav.component";
import { CeNavigationModule } from "../../navigation/navigation.module";
import { CeListModule } from "../../list/list.module";
import { CeFormQueryWrapperModule } from "../../formquery-wrapper/formquery-wrapper.module";
import { CeFormCardModule } from "../../forms/form-card/form-card.module";
import { CeLayoutModule } from "../../layout/layout.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ProjectAssocStoreService } from "./project-assoc-store.service";
import { NavigationItemStoreService } from "../../navigation/navigation-item-factory/navigation-item-store.service";
import { FormBlock, FormWrapper } from "@codeffekt/ce-core-data";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        CeProjectAssocComponent,
        ProjectAssocFactoryComponent,
        ProjectAssocDefaultComponent,
        ProjectAssocNavComponent,
    ],
    imports: [
        CommonModule,
        CeNavigationModule,
        CeListModule,
        CeFormQueryWrapperModule,
        CeFormCardModule,
        CeLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    exports: [
        CeProjectAssocComponent,
    ]
})
export class CeProjectAssocRenderModule {

    constructor(
        storeService: ProjectAssocStoreService,
        formActionService: FormActionService,
        navItemStore: NavigationItemStoreService,
      ) {
        storeService.setDefaultComponent(ProjectAssocDefaultComponent);    
        formActionService.setActions({
          [FormAssoc.ROOT]: FormActionBuilder.withRender(CeProjectAssocComponent)
        });
    
        console.log("ProjectAssocRenderModule");

        /* navItemStore.setComponents({
          [FormAssoc.ROOT]: {
            useFunction: (wrapper: FormWrapper) => {
              const block: FormBlock = FormWrapper.getFormValue("assoc", wrapper.core);
              const assocForm = FormWrapper.fromForm({
                id: block.field,
                ctime: wrapper.core.ctime,
                root: `${block.field}`,
                title: block.label ?? "NO LABEL",
                valid: true,
                content: {}
              });
              const existingComponentType = navItemStore.getComponentType(assocForm, false);
              return existingComponentType ?? ProjectAssocNavComponent;
            }
          }
        }) */
      }
    
}