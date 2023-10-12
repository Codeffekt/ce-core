import { FormQuerySortField } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';
import { PartialDatasource } from './partial.datasource';

export abstract class PaginatorFilterDatasource<T> extends PartialDatasource<T> {

  private pageIndex!: number;
  private pageSize!: number;
  private filter: string|undefined;
  private sortDirection: FormQuerySortField|undefined;

  constructor() {
    super();
  }

  load(pageIndex: number, pageSize: number, filter?: string, sortDirection?: FormQuerySortField, accumulate = false) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.filter = filter;
    this.sortDirection = sortDirection;
    this.accumulate = accumulate;
    this.queryAndUpdateData();
  }

  reload() {
    this.queryAndUpdateData()
  }

  private queryAndUpdateData() {
    this.queryData(this.pageIndex, this.pageSize, this.filter, this.sortDirection)
      .subscribe(data => this.updateData(data));
  }

  protected abstract queryData(pageIndex: number, pageSize: number, filter?: string, sortDirection?: FormQuerySortField): Observable<T[]>;

}
