import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CeFormQueryService, CeFormQueryWrapperModule, CeFormsService,
  CeListModule,
  CeNavigationModule, FormsFormQueryBuilder,
  FormWrappersDataSource
} from '@codeffekt/ce-core';
import { Observable } from 'rxjs';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    CommonModule,
    CeNavigationModule,
    CeFormQueryWrapperModule,
    CeListModule,    
  ],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class FormsComponent {

  formsDataSource!: FormWrappersDataSource;
  forms$!: Observable<readonly FormWrapper[]>;

  formQueryBuilder: FormsFormQueryBuilder = new FormsFormQueryBuilder();

  constructor(
    private readonly queryService: CeFormQueryService<FormWrapper>,
    private formsService: CeFormsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formsDataSource = new FormWrappersDataSource(this.formsService);
    this.queryService.setDatasource(this.formsDataSource);
  }

  ngOnInit() {
    this.prepareQueryService();
  }

  reloadForms() {
    this.queryService.load();
  }

  onSelected(form: FormWrapper) {
    this.router.navigate(['..', 'form', form.core.id], { relativeTo: this.route });
  }

  private async prepareQueryService() {
    this.queryService.setQueryBuilder(this.formQueryBuilder);
    this.queryService.setModel(null as any);
    this.forms$ = this.queryService.connect();
    this.queryService.load();
  }

}
