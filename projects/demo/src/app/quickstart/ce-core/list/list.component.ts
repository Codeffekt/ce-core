import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CeFormQueryService, CeFormsService, FormWrappersDataSource, FormsFormQueryBuilder } from '@codeffekt/ce-core';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class ListComponent implements OnInit {

  @Input() formWrapper: FormWrapper;
  @Output() formChanges = new EventEmitter<FormWrapper>();

  forms$!: Observable<readonly FormWrapper[]>;
  formsDataSource!: FormWrappersDataSource;
  formQueryBuilder = new FormsFormQueryBuilder();

  constructor(
    private readonly queryService: CeFormQueryService<FormWrapper>,
    formsService: CeFormsService,
  ) {
    this.formsDataSource = new FormWrappersDataSource(formsService);
    this.queryService.setDatasource(this.formsDataSource);
  }

  ngOnInit(): void {
    this.prepareQueryService();
  }

  private async prepareQueryService() {
    this.queryService.setQueryBuilder(this.formQueryBuilder);
    this.queryService.setModel(null as any);
    this.forms$ = this.queryService.connect();
    this.queryService.load();
  }
}
