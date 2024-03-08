import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntroductionComponent } from './introduction/introduction.component';
import {
    CeFormModule,
    CeSideMenuModule,
    FormActionBuilder, FormActionService,
    FormsLocalDatabaseService
} from "@codeffekt/ce-core";
import { CeBarcodeModule } from "@codeffekt/ce-barcode";
import { HighlightModule } from "ngx-highlightjs";
import { CeCoreComponent } from './ce-core/ce-core.component';
import { CeCoreDataComponent } from './ce-core-data/ce-core-data.component';
import { CeAdminComponent } from './ce-admin/ce-admin.component';
import { ApplicationComponent } from './application/application.component';
import { RouterModule } from "@angular/router";
import { HomeMenuComponent } from "./home-menu/home-menu.component";

@NgModule({
    imports: [
        CommonModule,
        HighlightModule,
        CeFormModule,
        CeBarcodeModule,
        CeSideMenuModule,
        RouterModule,
    ],
    declarations: [
        IntroductionComponent,
        CeCoreComponent,
        CeCoreDataComponent,
        CeAdminComponent,
        ApplicationComponent,
        HomeMenuComponent,
    ],
})
export class QuickstartModule {

    constructor(
        formActions: FormActionService,
        localDatabase: FormsLocalDatabaseService,
    ) {
        formActions.setActions({
            'form-quickstart-introduction': FormActionBuilder
                .withRender(IntroductionComponent)
                .setMenu(HomeMenuComponent),
            'form-quickstart-ce-core': FormActionBuilder
                .withRender(CeCoreComponent)
                .setMenu(HomeMenuComponent),
            'form-quickstart-ce-core-data': FormActionBuilder
                .withRender(CeCoreDataComponent)
                .setMenu(HomeMenuComponent),
            'form-quickstart-admin': FormActionBuilder
                .withRender(CeAdminComponent)
                .setMenu(HomeMenuComponent),
            'form-quickstart-application': FormActionBuilder
                .withRender(ApplicationComponent)
                .setMenu(HomeMenuComponent),
        });
        localDatabase.setForms({
            'quickstart-introduction': {
                id: 'quickstart-introduction',
                title: 'Introduction',
                ctime: Date.now(),
                valid: true,
                root: 'form-quickstart-introduction',
                content: {}
            },
            'quickstart-ce-core': {
                id: 'quickstart-ce-core',
                title: 'Rendu ce-core',
                ctime: Date.now(),
                valid: true,
                root: 'form-quickstart-ce-core',
                content: {}
            },
            'quickstart-ce-core-data': {
                id: 'quickstart-ce-core-data',
                title: 'Format et modèle',
                ctime: Date.now(),
                valid: true,
                root: 'form-quickstart-ce-core-data',
                content: {}
            },
            'quickstart-admin': {
                id: 'quickstart-admin',
                title: 'Le module ce-admin',
                ctime: Date.now(),
                valid: true,
                root: 'form-quickstart-admin',
                content: {}
            },
            'quickstart-application': {
                id: 'quickstart-application',
                title: 'Créer une application',
                ctime: Date.now(),
                valid: true,
                root: 'form-quickstart-application',
                content: {}
            },
        });
    }

}