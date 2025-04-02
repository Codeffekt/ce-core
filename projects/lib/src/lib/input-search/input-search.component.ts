import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CeFormQueryService } from '../services';
import { debounceTime } from 'rxjs';

const DEBOUNCE_TIME_MS = 20;

@UntilDestroy()
@Component({
  selector: 'ce-input-search',
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {

  formControl = new UntypedFormControl();

  @Output() search = new EventEmitter<string>();

  private queryService = inject(CeFormQueryService);

  constructor() {
    this.listenInputChanges();
  }

  private listenInputChanges() {    
    this.formControl.valueChanges.pipe(
      untilDestroyed(this),           
      debounceTime(DEBOUNCE_TIME_MS),      
    ).subscribe(value => this.onValueChanged(value));
  }

  private onValueChanged(value: string) {
    if(!value) {
      this.queryService.clearFilter();
    } else {
      this.queryService.setFilter(value);
    }    
    this.queryService.load();
    this.search.next(value);
  }
}
