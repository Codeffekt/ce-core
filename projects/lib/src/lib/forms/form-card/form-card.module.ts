import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormCardComponent } from './form-card.component';
import { FormCardContentComponent } from './form-card-content/form-card-content.component';
import { FormCardHeaderComponent } from './form-card-header/form-card-header.component';
import { FormCardTitleComponent } from "./form-card-title/form-card-title.component";

@NgModule({
    declarations: [
        FormCardComponent,
        FormCardContentComponent,
        FormCardHeaderComponent,
        FormCardTitleComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FormCardComponent,
        FormCardContentComponent,
        FormCardHeaderComponent,
        FormCardTitleComponent,
    ]
})
export class CeFormCardModule { }