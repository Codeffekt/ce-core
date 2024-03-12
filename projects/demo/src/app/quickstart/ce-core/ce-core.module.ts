import { NgModule } from "@angular/core";
import { CeCoreComponent } from "./ce-core.component";
import { CommonModule } from "@angular/common";
import {
    CeFormModule, CeFormQueryWrapperModule, CeListModule, CeSideMenuModule, FormActionBuilder,
    FormActionService, FormsLocalDatabaseService
} from "@codeffekt/ce-core";
import { HighlightModule } from "ngx-highlightjs";
import { CeBarcodeModule } from "@codeffekt/ce-barcode";
import { RouterModule } from "@angular/router";
import { InstallationComponent } from './installation/installation.component';
import { MenuComponent } from './menu/menu.component';
import { ListComponent } from './list/list.component';

@NgModule({
    declarations: [
        CeCoreComponent,
        InstallationComponent,
        MenuComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HighlightModule,
        CeFormModule,
        CeBarcodeModule,
        CeSideMenuModule,
        CeFormQueryWrapperModule,
        CeListModule,
    ],
    exports: [
        CeCoreComponent,
        MenuComponent,
        ListComponent,
        InstallationComponent,
    ]
})
export class CeCoreModule {

    constructor(
        formActions: FormActionService,
        localDatabase: FormsLocalDatabaseService,
    ) {
        formActions.setActions({
            'ce-core-installation': FormActionBuilder
                .withRender(InstallationComponent)
                .setMenu(MenuComponent),
            'ce-core-list': FormActionBuilder
                .withRender(ListComponent)
                .setMenu(MenuComponent),
        });
        localDatabase.setForms({
            'ce-core-installation': {
                id: 'ce-core-installation',
                title: 'Installation',
                ctime: Date.now(),
                valid: true,
                root: 'ce-core-installation',
                content: {}
            },
            'ce-core-list': {
                id: 'ce-core-list',
                title: 'Lister les formulaires',
                ctime: Date.now(),
                valid: true,
                root: 'ce-core-list',
                content: {}
            },
        });
    }

}