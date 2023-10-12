import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FeatureBarComponent } from "./feature-bar.component";

@NgModule({
    declarations: [
        FeatureBarComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
    ],
    exports: [
        FeatureBarComponent,
    ]    
})
export class CeFeatureBarModule {}