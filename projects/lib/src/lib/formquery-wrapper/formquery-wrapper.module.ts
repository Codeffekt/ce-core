import { NgModule } from "@angular/core";
import { FormQueryWrapperComponent } from "./formquery-wrapper.component";

@NgModule({    
    imports: [        
        FormQueryWrapperComponent,
    ],
    exports: [
        FormQueryWrapperComponent
    ]
})
export class CeFormQueryWrapperModule { }