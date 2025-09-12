import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CeCodeEditorModule } from '@codeffekt/ce-code-editor';
import { FormsRoutingModule } from './forms-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
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
