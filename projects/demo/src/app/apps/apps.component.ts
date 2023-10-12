import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormWrapper } from '@codeffekt/ce-core-data';
import {
  CeAppsDataSource, CeAppsFormQueryBuilder,
  CeFormQueryService, CeFormsService
} from '@codeffekt/ce-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class AppsComponent implements OnInit {

  appsDataSource!: CeAppsDataSource;
  formQueryBuilder: CeAppsFormQueryBuilder = new CeAppsFormQueryBuilder();
  apps$!: Observable<readonly FormWrapper[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formsService: CeFormsService,
    private readonly queryService: CeFormQueryService<FormWrapper>,   
  ) {
    this.appsDataSource = new CeAppsDataSource(this.formsService);
    this.queryService.setDatasource(this.appsDataSource);
    this.queryService.setQueryBuilder(this.formQueryBuilder);
    this.apps$ = this.queryService.connect();   
  }

  ngOnInit(): void {
    this.queryService.load();
  }

  onSelected(form: FormWrapper) {
    this.router.navigate(['../app', form.core.id], { relativeTo: this.route });
  }
}
