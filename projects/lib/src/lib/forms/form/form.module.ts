import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { CeFormQueryWrapperModule } from "../../formquery-wrapper";
import { CeFormsPipesModule } from "../../forms-pipes";
import { CeLayoutModule } from "../../layout/layout.module";
import { CeMediaPhotoModule } from "../../media-photo";
import { CePaginatorModule } from "../../paginator";
import { CeTableModule } from "../../table";
import { CeFormBlocksModule } from "../form-blocks";
import { CeFormCardModule } from "../form-card";
import { FormChooserDialogComponent } from './form-chooser-dialog/form-chooser-dialog.component';
import { FormSubformTitleComponent } from './form-subform-title/form-subform-title.component';
import { CeFormComponent } from './form.component';
import { PhotoPickerComponent } from './photo-picker/photo-picker.component';
import { CeFormFactoryComponent } from './form-factory/form-factory.component';
import { FormNewComponent } from "./form-new/form-new.component";
import { FormNewFactoryComponent } from "./form-new-factory/form-new-factory.component";
import { FormActionService } from "./actions/form-action.service";
import { FormActionDefault } from "./actions/form-action-default";

@NgModule({
    declarations: [
        CeFormComponent,
        FormChooserDialogComponent,
        PhotoPickerComponent,
        FormSubformTitleComponent,
        FormNewComponent,
        FormNewFactoryComponent,
        CeFormFactoryComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        CeFormQueryWrapperModule,
        CeTableModule,
        CeLayoutModule,
        CeFormsPipesModule,
        CePaginatorModule,
        CeMediaPhotoModule,
        CeFormBlocksModule,
        CeFormCardModule,
    ],
    exports: [
        CeFormComponent,
        CeFormFactoryComponent,
        FormNewComponent,
        FormNewFactoryComponent,
        PhotoPickerComponent,
    ]
})
export class CeFormModule {
    constructor(
        /* formStore: CeFormStoreService, */
        formActions: FormActionService,
        formActionDefault: FormActionDefault,
    ) {
        formActions.setDefaultAction(formActionDefault);
        /* formStore.setDefaultRenderer(CeFormComponent);
        formStore.setDefaultBuilder(FormNewComponent); */
    }
}