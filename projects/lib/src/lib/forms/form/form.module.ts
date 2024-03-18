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
import { FormNewComponent } from "./form-new/form-new.component";
import { FormNewFactoryComponent } from "./form-new-factory/form-new-factory.component";
import { FormMenuComponent } from './form-menu/form-menu.component';
import { FormTopbarComponent } from './form-topbar/form-topbar.component';
import { CeNavigationModule } from "../../navigation/navigation.module";
import { FormToolbarComponent } from './form-toolbar/form-toolbar.component';
import { CeEditTimeModule } from "../../widgets/edit-time/edit-time.module";

@NgModule({
    declarations: [
        CeFormComponent,
        FormChooserDialogComponent,
        PhotoPickerComponent,
        FormSubformTitleComponent,
        FormNewComponent,
        FormNewFactoryComponent,
        CeFormFactoryComponent,
        FormMenuComponent,
        FormTopbarComponent,
        FormToolbarComponent
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
        CeNavigationModule,
        CeFormsPipesModule,
        CePaginatorModule,
        CeMediaPhotoModule,
        CeFormBlocksModule,
        CeFormCardModule,
        CeEditTimeModule,
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
}