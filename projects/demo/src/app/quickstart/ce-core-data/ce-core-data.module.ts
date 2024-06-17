import { NgModule } from "@angular/core";
import { CeFormModule, CeListModule, CeSideMenuModule, FormActionBuilder, FormActionService, FormsLocalDatabaseService } from "@codeffekt/ce-core";
import { CeCoreDataComponent } from "./ce-core-data.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HighlightModule } from "ngx-highlightjs";
import { MenuComponent } from './menu/menu.component';
import { BlockTypeRootComponent } from './block-types/block-type-root/block-type-root.component';

@NgModule({
    declarations: [
        CeCoreDataComponent,
        MenuComponent,
        BlockTypeRootComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        HighlightModule,
        CeFormModule,
        CeSideMenuModule,
        CeListModule,
    ],
    exports: [
        CeCoreDataComponent,
        MenuComponent,
    ]
})
export class CeCoreDataModule {

    constructor(
        formActions: FormActionService,
        localDatabase: FormsLocalDatabaseService,
    ) {
        formActions.setActions({
            'ce-core-data-introduction': FormActionBuilder
                .withRender(CeCoreDataComponent)
                .setMenu(MenuComponent),
            'ce-core-data-block-types-root': FormActionBuilder
                .withRender(BlockTypeRootComponent)
                .setMenu(MenuComponent)
        });
        localDatabase.setForms({
            'ce-core-data-introduction': {
                id: 'ce-core-data-introduction',
                title: 'Format et modèle',
                ctime: Date.now(),
                valid: true,
                root: 'ce-core-data-introduction',
                content: {}
            },
            'ce-core-data-block-types-root': {
                id: 'ce-core-data-block-types-root',
                title: 'Le type de block root',
                ctime: Date.now(),
                valid: true,
                root: 'ce-core-data-block-types-root',
                content: {}
            },
        });
        localDatabase.setRoots({
            'forms-method': {
                id: 'forms-method',
                ctime: Date.now(),
                title: 'Generic method',
                content: {
                    name: {
                        field: "name",
                        label: "Name",
                        type: "text",
                    }
                }
            },
            'forms-algorithm': {
                id: 'forms-algorithm',
                ctime: Date.now(),
                title: 'Generic algorithm',
                content: {
                    name: {
                        field: "name",
                        label: "Name",
                        type: "text",
                    }
                }
            }
        })

    }

}