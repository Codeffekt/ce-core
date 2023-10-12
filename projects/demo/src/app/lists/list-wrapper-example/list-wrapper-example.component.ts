import { Component, OnInit } from '@angular/core';
import { DataFormQueryBuilder } from '../../tables/table-wrapper-example/datasources/data-formquery-builder';
import { TableWrapperExampleFormQueryDataSource } from '../../tables/table-wrapper-example/datasources/table-wrapper-example.query-datasource';
import { PeriodicElement, PeriodicElementWrapper } from '../../tables/table-wrapper-example/datasources/data';
import { CeFormQueryService } from '@codeffekt/ce-core';
import { Observable } from 'rxjs';
import { getFormModel } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-list-wrapper-example',
  templateUrl: './list-wrapper-example.component.html',
  styleUrls: ['./list-wrapper-example.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class ListWrapperExampleComponent implements OnInit {

  formQueryBuilder = new DataFormQueryBuilder();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  items$: Observable<readonly PeriodicElementWrapper[]>;
  selectedElement: PeriodicElementWrapper | undefined;

  constructor(private readonly queryService: CeFormQueryService<PeriodicElementWrapper>) {
    this.queryService.setDatasource(new TableWrapperExampleFormQueryDataSource());
    this.queryService.setQueryBuilder(this.formQueryBuilder);
    this.queryService.setModel(getFormModel(new PeriodicElement()));
    this.queryService.load();
  }

  ngOnInit(): void {
    this.observeDataSource();
  }

  onSelectItem(element: PeriodicElementWrapper) {
    this.selectedElement = element;
  }

  private observeDataSource() {
    this.items$ = this.queryService.connect();    
  }
}
