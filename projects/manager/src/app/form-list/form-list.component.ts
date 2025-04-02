import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CeFormQueryService,
  CeFormQueryWrapperModule, CeFormsService,
  CeGridModule,
  CeListModule, CeNavigationModule,
  FormQuerySearchBuilder,
  FormWrappersDataSource,
  InputSearchComponent,
} from '@codeffekt/ce-core';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';
import { FormListService } from './form-list.service';

@Component({
  selector: 'app-form-list',
  imports: [
    CommonModule,
    CeNavigationModule,
    CeFormQueryWrapperModule,
    CeGridModule,
    CeListModule,    
    InputSearchComponent,
],
  providers: [
    CeFormQueryService,
  ],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss'
})
export class FormListComponent implements OnInit {

  root = toSignal(inject(FormListService).listenRoot(), { requireSync: true });

  forms$!: Observable<readonly FormWrapper[]>;

  private router = inject(Router);
  private formsService = inject(CeFormsService);
  private formsDataSource = new FormWrappersDataSource(this.formsService);
  private queryService = inject(CeFormQueryService);

  constructor() {
    this.queryService.setDatasource(this.formsDataSource);
  }

  ngOnInit(): void {
    this.prepareQueryService();
  }

  onSelected(form: FormWrapper) {
    this.router.navigate(['/form', form.core.id]);
  }  

  private async prepareQueryService() {
    const queryBuilder = new FormQuerySearchBuilder(this.root());
    queryBuilder.setRoot(this.root().id);
    queryBuilder.setExtMode(false);

    this.queryService.setQueryBuilder(queryBuilder);
    this.queryService.setModel(this.root());
    this.forms$ = this.queryService.connect();
    this.queryService.load();
  }
}
