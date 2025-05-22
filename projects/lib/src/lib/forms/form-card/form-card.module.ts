import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormCardContentComponent } from './form-card-content/form-card-content.component';
import { FormCardHeaderComponent } from './form-card-header/form-card-header.component';
import { FormCardTitleComponent } from "./form-card-title/form-card-title.component";
import { FormCardComponent } from "./form-card.component";

@NgModule({   
    imports: [
        CommonModule,
        FormCardContentComponent,
        FormCardHeaderComponent,
        FormCardTitleComponent,
        FormCardComponent,
    ],
    exports: [
        FormCardContentComponent,
        FormCardHeaderComponent,
        FormCardTitleComponent,
        FormCardComponent,
    ]
})
export class CeFormCardModule { }