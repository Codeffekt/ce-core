import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CeCoreService,
  CeFormQueryService, CeFormsService, 
  FormsDataSource
} from '@codeffekt/ce-core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { filter, Observable } from 'rxjs';
import { MyFormsQueryBuilder } from './my-forms-query.builder';

@Component({
  selector: 'app-my-forms',
  templateUrl: './my-forms.component.html',
  styleUrls: ['./my-forms.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class MyFormsComponent implements OnInit {

  formsDataSource!: FormsDataSource;
  formQueryBuilder: MyFormsQueryBuilder;

  forms$!: Observable<readonly FormInstance[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coreService: CeCoreService,
    private formsService: CeFormsService,
    private readonly queryService: CeFormQueryService<FormInstance>,
  ) {
    this.formsDataSource = new FormsDataSource(this.formsService);
    this.formQueryBuilder = new MyFormsQueryBuilder(this.coreService.getCurrentUser().settings);
    this.queryService.setDatasource(this.formsDataSource);
    this.queryService.setQueryBuilder(this.formQueryBuilder);    
    this.forms$ = this.queryService.connect();    
  }

  ngOnInit(): void {
  }

  goForm(form: FormInstance) {
    this.router.navigate(['../form', form.id], { relativeTo: this.route });
  }  

}
