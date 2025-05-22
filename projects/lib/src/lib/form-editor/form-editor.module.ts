import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CeEditTimeModule } from "../widgets/edit-time/edit-time.module";
import { CeFeatureBarModule } from "../widgets/feature-bar/feature-bar.module";
import { CeFormModule } from "../forms/form/form.module";
import { CeLayoutModule } from "../layout/layout.module";
import { CeNavigationModule } from "../navigation/navigation.module";

@NgModule({   
    imports: [
        CommonModule,
        CeFeatureBarModule,
        CeEditTimeModule,
        CeLayoutModule,
        CeNavigationModule,
        CeFormModule,
    ],    
})
export class CeFormEditorModule {}