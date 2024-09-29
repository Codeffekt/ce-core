import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeFormEditorModule } from '@codeffekt/ce-core';
import { FormRoutingModule } from './form-routing.module';
import { FormPathService } from './form-path.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormRoutingModule,
        CeFormEditorModule,
    ],
    providers: [
        FormPathService,
    ]   
})
export class FormModule { }
