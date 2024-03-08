import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CeEditTimeModule } from "../widgets/edit-time/edit-time.module";
import { CeFeatureBarModule } from "../widgets/feature-bar/feature-bar.module";
import { CeFormsModule } from "../forms";
import { CeLayoutModule } from "../layout/layout.module";
import { CeNavigationModule } from "../navigation/navigation.module";
import { CeFormEditorComponent } from "./form-editor.component";
import { CeFormEditorMenuComponent } from './form-editor-menu/form-editor-menu.component';
import { CeFormEditorTopbarComponent } from './form-editor-topbar/form-editor-topbar.component';

@NgModule({
    declarations: [
        CeFormEditorComponent,
        CeFormEditorMenuComponent,
        CeFormEditorTopbarComponent
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
        CeFormEditorMenuComponent, 
        CeFormEditorTopbarComponent,    
    ]
})
export class CeFormEditorModule {}