import { Component } from '@angular/core';
import { CeFormQueryService, ShareableDataSource } from '@codeffekt/ce-core';
import { getFormModel } from '@codeffekt/ce-core-data';
import { PeriodicElement, PeriodicElementWrapper } from './datasources/data';
import { DataFormQueryBuilder } from './datasources/data-formquery-builder';
import { TableWrapperExampleFormQueryDataSource } from './datasources/table-wrapper-example.query-datasource';

@Component({
  selector: 'app-table-wrapper-example',
  templateUrl: './table-wrapper-example.component.html',
  styleUrls: ['./table-wrapper-example.component.scss'],   
  providers: [
    CeFormQueryService
  ] 
})
export class TableWrapperExampleComponent {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'ctime'];
  dataSource: ShareableDataSource<PeriodicElementWrapper>;
  formQueryBuilder = new DataFormQueryBuilder();  

  constructor(private readonly queryService: CeFormQueryService<PeriodicElementWrapper>) { 
    this.dataSource = this.queryService.setDatasource(new TableWrapperExampleFormQueryDataSource());
    this.queryService.setQueryBuilder(this.formQueryBuilder);
    this.queryService.setModel(getFormModel(new PeriodicElement()));
    this.queryService.load();
  }
}
