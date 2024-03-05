import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { CeFormQueryService } from '../services';
import { FormQueryBuilder, FormQueryDatasource } from '../forms';

@UntilDestroy()
@Component({
  selector: 'ce-form-input-autocomplete',
  templateUrl: './form-input-autocomplete.component.html',
  styleUrls: ['./form-input-autocomplete.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class FormInputAutocompleteComponent implements OnInit {

  @Input() queryBuilder!: FormQueryBuilder;
  @Input() datasource!: FormQueryDatasource<FormWrapper>;
  @Input() label?: string;
  @Output() form = new EventEmitter<FormWrapper>();

  formControl!: UntypedFormControl;
  suggestions$!: Observable<readonly FormWrapper[]>;

  constructor(private queryService: CeFormQueryService<FormWrapper>) { }

  ngOnInit(): void {
    this.initFormControl();
    this.initQueryService();
  }

  select(suggestion: any) {
    this.formControl.reset();
    this.form.emit(suggestion);
  }

  private initQueryService() {
    this.queryService.setQueryBuilder(this.queryBuilder);
    this.queryService.setDatasource(this.datasource);
    this.suggestions$ = this.queryService.connect();
  }

  private initFormControl() {
    this.formControl = new UntypedFormControl('');
    this.formControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        // TODO: refresh
        this.queryBuilder.setFilter(value);
        this.queryService.load();
      })
  }
}
