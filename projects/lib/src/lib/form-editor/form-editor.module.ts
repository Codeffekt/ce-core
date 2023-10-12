import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CeEditTimeModule } from "../widgets/edit-time/edit-time.module";
import { CeFeatureBarModule } from "../widgets/feature-bar/feature-bar.module";
import { CeFormsModule } from "../forms";
import { CeLayoutModule } from "../layout/layout.module";
import { CeNavigationModule } from "../navigation/navigation.module";
import { CeFormEditorComponent } from "./form-editor.component";

@NgModule({
    declarations: [
        CeFormEditorComponent
    ],
    imports: [
        CommonModule,
        CeFeatureBarModule,
        CeEditTimeModule,
        CeLayoutModule,
        CeNavigationModule,
        CeFormsModule,
    ],
    exports: [
        CeFormEditorComponent,
    ]
})
export class CeFormEditorModule {}