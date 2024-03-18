import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CeEditTimeModule } from "../widgets/edit-time/edit-time.module";
import { CeFeatureBarModule } from "../widgets/feature-bar/feature-bar.module";
import { CeFormModule } from "../forms/form/form.module";
import { CeLayoutModule } from "../layout/layout.module";
import { CeNavigationModule } from "../navigation/navigation.module";
import { CeFormEditorComponent } from "./form-editor.component";
import { CeFormEditorMenuComponent } from './form-editor-menu/form-editor-menu.component';
import { CeFormEditorTopbarComponent } from './form-editor-topbar/form-editor-topbar.component';
import { CeFormEditorToolbarComponent } from './form-editor-toolbar/form-editor-toolbar.component';

@NgModule({
    declarations: [
        CeFormEditorComponent,
        CeFormEditorMenuComponent,
        CeFormEditorTopbarComponent,
        CeFormEditorToolbarComponent
    ],
    imports: [
        CommonModule,
        CeFeatureBarModule,
        CeEditTimeModule,
        CeLayoutModule,
        CeNavigationModule,
        CeFormModule,
    ],
    exports: [
        CeFormEditorComponent,   
        CeFormEditorMenuComponent, 
        CeFormEditorTopbarComponent,
        CeFormEditorToolbarComponent,    
    ]
})
export class CeFormEditorModule {}