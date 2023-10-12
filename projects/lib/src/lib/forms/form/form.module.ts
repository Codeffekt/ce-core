import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
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
import { CeFormStoreService } from "./form-store.service";

@NgModule({
    declarations: [
        CeFormComponent,
        FormChooserDialogComponent,
        PhotoPickerComponent,
        FormSubformTitleComponent,
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
        PhotoPickerComponent,
    ]
})
export class CeFormModule {
    constructor(private formStore: CeFormStoreService) {
        this.formStore.setDefaultComponent(CeFormComponent);
    }
}