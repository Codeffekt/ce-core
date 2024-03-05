import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormArrayBlockComponent } from './form-array-block/form-array-block.component';
import { FormAssetBlockComponent } from './form-asset-block/form-asset-block.component';
import { FormAssocBlockComponent } from './form-assoc-block/form-assoc-block.component';
import { FormBlockFactoryComponent } from './form-block-factory/form-block-factory.component';
import { FormBlockStoreService } from './form-block-factory/form-block-store.service';
import { FormBlockFieldComponent } from './form-block-field/form-block-field.component';
import { FormBooleanBlockComponent } from './form-boolean-block/form-boolean-block.component';
import { FormIndexBlockComponent } from './form-index-block/form-index-block.component';
import { FormNumberBlockComponent } from './form-number-block/form-number-block.component';
import { FormSelectBlockComponent } from './form-select-block/form-select-block.component';
import { FormTextBlockComponent } from './form-text-block/form-text-block.component';
import { FormTimestampBlockComponent } from './form-timestamp-block/form-timestamp-block.component';

import { FormBlockFieldActionsComponent } from './form-block-field/form-block-field-actions/form-block-field-actions.component';
import { FormBlockFieldContentComponent } from './form-block-field/form-block-field-content/form-block-field-content.component';
import { FormBlockFieldFloatingActionComponent } from './form-block-field/form-block-field-floating-action/form-block-field-floating-action.component';
import { FormBlockFieldHeaderComponent } from './form-block-field/form-block-field-header/form-block-field-header.component';
import { FormBlockFieldTitleComponent } from './form-block-field/form-block-field-title/form-block-field-title.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyCheckboxModule as MatCheckboxModule } from "@angular/material/legacy-checkbox";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { CeFormQueryWrapperModule } from "../../formquery-wrapper";
import { CeFormsPipesModule } from "../../forms-pipes";
import { CeLayoutModule } from "../../layout";
import { CeListModule } from "../../list";
import { CePipesModule } from "../../pipes/pipes.module";
import { CeTableModule } from "../../table";
import { CeNgReallyModule } from "../../widgets/ng-really";
import { CeFormHintComponent } from "./form-hint/form-hint.component";
import { CeFormDescriptionComponent } from "./form-description/form-description.component";
import { FormAlertComponent } from './form-alert/form-alert.component';

@NgModule({
    declarations: [
        FormTextBlockComponent,
        FormNumberBlockComponent,
        FormBlockFactoryComponent,
        FormTimestampBlockComponent,
        FormBooleanBlockComponent,
        FormSelectBlockComponent,
        FormArrayBlockComponent,
        FormIndexBlockComponent,
        FormAssocBlockComponent,
        FormAssetBlockComponent,
        FormBlockFieldComponent,
        FormBlockFieldActionsComponent,
        FormBlockFieldContentComponent,
        FormBlockFieldHeaderComponent,
        FormBlockFieldFloatingActionComponent,
        FormBlockFieldTitleComponent,
        CeFormHintComponent,
        CeFormDescriptionComponent,
        FormAlertComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        CeFormQueryWrapperModule,
        CeTableModule,
        CeListModule,
        CeLayoutModule,
        CeFormsPipesModule,
        CePipesModule,
        CeNgReallyModule,
    ],
    exports: [
        FormBlockFactoryComponent,
        FormBlockFieldComponent,
        FormBlockFieldActionsComponent,
        FormBlockFieldContentComponent,
        FormBlockFieldHeaderComponent,
        FormBlockFieldFloatingActionComponent,
        FormBlockFieldTitleComponent,
    ]
})
export class CeFormBlocksModule {
    constructor(private readonly formBlockStore: FormBlockStoreService) {
        this.formBlockStore.setComponents({
            'boolean': FormBooleanBlockComponent,
            'formArray': FormArrayBlockComponent,
            'formAssoc': FormArrayBlockComponent,
            'index': FormIndexBlockComponent,
            'number': FormNumberBlockComponent,
            'select': FormSelectBlockComponent,
            'text': FormTextBlockComponent,
            'timestamp': FormTimestampBlockComponent,
            'asset': FormAssetBlockComponent,
        });
    }
}