import { Component, OnInit } from '@angular/core';
import { CeAppService, CeCoreService, CeFormQueryService, CeFormsService, FormsDataSource, FormsFormQueryBuilder } from '@codeffekt/ce-core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forms-query',
  templateUrl: './forms-query.component.html',
  styleUrls: ['./forms-query.component.scss'],
  providers: [
    CeFormQueryService,    
  ]
})
export class FormsQueryComponent implements OnInit {

  items$: Observable<readonly FormInstance[]>;

  constructor(
    private readonly queryService: CeFormQueryService<FormInstance>,
    private readonly coreService: CeCoreService,
    private readonly appService: CeAppService,
    readonly formsService: CeFormsService
  ) {
    this.queryService.setDatasource(new FormsDataSource(formsService));    
    this.queryService.setQueryBuilder(new FormsFormQueryBuilder());
  }

  ngOnInit(): void {
    this.observeDataSource();
    this.loadAppProject();
  }
  

  private observeDataSource() {
    this.items$ = this.queryService.connect();
  }

  private async loadAppProject() {    
  }
}
