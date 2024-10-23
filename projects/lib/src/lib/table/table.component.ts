import { AfterViewInit, ChangeDetectorRef, Component, ContentChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { FormQuerySortField } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CeFormQueryService } from '../services/ce-form-query.service';
import { MatTable } from '@angular/material/table';

@UntilDestroy()
@Component({
  selector: 'ce-table-wrapper',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T = any> implements AfterViewInit {  

  @ContentChild(MatTable) table!: MatTable<T>;
  @ContentChild(MatSort) sort!: MatSort;  

  sortValue?: FormQuerySortField;

  constructor(
    private formQueryService: CeFormQueryService<T>,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {    
  }

  ngAfterViewInit() {
    this.initDataSource();
    this.observeSortChanges();
  }  

  applySort(sort: Sort) {
    this.sortValue = sort.direction ? { field: sort.active, order: sort.direction } : undefined;
    if(this.sortValue) {
      this.formQueryService.setSort(this.sortValue);
    }
    this.resetAndReload();
  }  

  private initDataSource() {
    if(!this.table.dataSource) {
      this.table.dataSource = this.formQueryService.getDatasource();       
    }     
  }

  private resetAndReload() {
    this.formQueryService.setPaginationFirstPage();
    this.formQueryService.load();
  }  

  private observeSortChanges() {
    this.sort?.sortChange
      .pipe(untilDestroyed(this))
      .subscribe(sort => this.applySort(sort));
  }
}
