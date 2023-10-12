import { NgModule } from "@angular/core";
import { QuickstartRoutingModle } from "./quickstart-routing.module";
import { CommonModule } from "@angular/common";
import { IntroductionComponent } from './introduction/introduction.component';
import { CeFormModule } from "@codeffekt/ce-core";
import { CeBarcodeModule } from "@codeffekt/ce-barcode";
import { HighlightModule } from "ngx-highlightjs";
import { CeCoreComponent } from './ce-core/ce-core.component';
import { CeCoreDataComponent } from './ce-core-data/ce-core-data.component';

@NgModule({
    imports: [
        CommonModule,
        HighlightModule,
        QuickstartRoutingModle,
        CeFormModule,
        CeBarcodeModule,
    ],
    declarations: [
        IntroductionComponent,
        CeCoreComponent,
        CeCoreDataComponent
    ],
    providers: [
        
    ]
})
export class QuickstartModule { }