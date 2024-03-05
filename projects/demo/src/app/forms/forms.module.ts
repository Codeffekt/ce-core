import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { CeCodeEditorModule } from '@codeffekt/ce-code-editor';
import { FormsMaskComponent } from './forms-mask/forms-mask.component';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { FormsFactoryComponent } from './forms-factory/forms-factory.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { CeFormCoordinatesModule } from '@codeffekt/ce-form-coordinates';
import { CeBarcodeModule } from '@codeffekt/ce-barcode';
import { FormsQueryComponent } from './forms-query/forms-query.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import {
  CeBookmarksModule, CeFormQueryWrapperModule,
  CeFormsModule,
  CeListModule, CeTableModule
} from '@codeffekt/ce-core';

@NgModule({
  declarations: [
    FormsComponent,
    FormsMaskComponent,
    FormsFactoryComponent,
    FormsQueryComponent,
    FormsListComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    ReactiveFormsModule,
    AngularFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    CeCodeEditorModule,
    CeFormsModule,
    CeFormCoordinatesModule,
    CeBarcodeModule,
    CeListModule,
    CeFormQueryWrapperModule,   
    CeBookmarksModule,
    CeTableModule,
  ],
  providers: [

  ]
})
export class FormsModule {
}
