import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputAutocompleteComponent } from './form-input-autocomplete.component';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormInputAutocompleteItemFactoryComponent } from './form-input-autocomplete-item-factory/form-input-autocomplete-item-factory.component';
import { FormInputAutocompleteItemDefaultComponent } from './form-input-autocomplete-item-default/form-input-autocomplete-item-default.component';
import { CeFormInputAutocompleteStoreService } from './form-input-autocomplete-store.service';

@NgModule({
  declarations: [
    FormInputAutocompleteComponent,
    FormInputAutocompleteItemFactoryComponent,
    FormInputAutocompleteItemDefaultComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  exports: [
    FormInputAutocompleteComponent,
    FormInputAutocompleteItemFactoryComponent
  ]
})
export class CeFormInputAutocompleteModule {

  constructor(private store: CeFormInputAutocompleteStoreService) {
    this.store.setDefaultComponent(FormInputAutocompleteItemDefaultComponent);
  }
}
