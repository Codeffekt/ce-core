import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntroductionComponent } from './introduction/introduction.component';
import {
    CeFormModule,
    CeSideMenuModule,
    FormActionBuilder, FormActionService,
    FormsLocalDatabaseService,
    FormStoreService
} from "@codeffekt/ce-core";
import { CeBarcodeModule } from "@codeffekt/ce-barcode";
import { HighlightModule } from "ngx-highlightjs";
import { CeAdminComponent } from './ce-admin/ce-admin.component';
import { ApplicationComponent } from './application/application.component';
import { RouterModule } from "@angular/router";
import { HomeMenuComponent } from "./home-menu/home-menu.component";
import { CeCoreModule } from "./ce-core/ce-core.module";
import { CeCoreDataModule } from "./ce-core-data/ce-core-data.module";

@NgModule({
    imports: [
        CommonModule,
        HighlightModule,
        CeFormModule,
        CeBarcodeModule,
        CeSideMenuModule,
        CeCoreModule,
        CeCoreDataModule,
        RouterModule,
    ],
    declarations: [
        IntroductionComponent,
        CeAdminComponent,
        ApplicationComponent,
        HomeMenuComponent,
    ],
})
export class QuickstartModule {

    constructor(
        formActions: FormActionService,
        formStoreService: FormStoreService,
        localDatabase: FormsLocalDatabaseService,
    ) {
        formStoreService.setComponents({
            'form-quickstart-introduction': IntroductionComponent,
            'form-quickstart-admin': CeAdminComponent,
            'form-quickstart-application': ApplicationComponent,
        });

        formActions.setActions({
            'form-quickstart-introduction': FormActionBuilder
                .withMenu(HomeMenuComponent),
            'form-quickstart-admin': FormActionBuilder
                .withMenu(HomeMenuComponent),
            'form-quickstart-application': FormActionBuilder
                .withMenu(HomeMenuComponent),
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