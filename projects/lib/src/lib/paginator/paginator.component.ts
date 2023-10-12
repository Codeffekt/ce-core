import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinct } from 'rxjs/operators';
import { CeFormQueryService } from '../services/ce-form-query.service';

const DEFAULT_LIMIT = 10;

@UntilDestroy()
@Component({
  selector: 'ce-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent<T = any> implements AfterViewInit {

  @Input() pageSize = DEFAULT_LIMIT;
  @Input() pageSizeOptions = [5, 10, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  total = 0;

  constructor(
    private queryService: CeFormQueryService<T>,
  ) { }  

  ngAfterViewInit() {
    setTimeout(() => {
      this.initDataSource();
      this.observeQueryChanges();
      this.setupPaginator();
    }, 0);   
    this.observePaginatorChanges();    
  }  

  private initDataSource() {
    this.queryService.connect().pipe(
      untilDestroyed(this),
    ).subscribe(_ => this.total = this.queryService.getTotal());
  }

  private observePaginatorChanges() {
    this.paginator.page
      .pipe(
        untilDestroyed(this),
        distinct(),        
      )
      .subscribe(_ => this.applyPaginationChanges(this.paginator.pageIndex, this.paginator.pageSize));
  }

  private observeQueryChanges() {
    this.queryService.query$.pipe(
      untilDestroyed(this),
    ).subscribe(query => {
      this.pageSize = query.limit;      
      this.paginator.pageIndex = query.offset / this.pageSize
    });
  }

  private applyPaginationChanges(pageIndex: number, pageSize: number) {
    this.pageSize = pageSize;    
    this.queryService.setPagination(pageIndex, pageSize);
    this.queryService.load();
  }

  private setupPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Éléments par page';
    this.paginator._intl.nextPageLabel = 'Suivant';
    this.paginator._intl.previousPageLabel = 'Précédent';
    this.paginator._intl.getRangeLabel = this.rangeLabel;
  }

  private rangeLabel(page: number, pageSize: number, length: number): string {
    const startIndex = (page * pageSize) + 1;
    const endIndex = Math.min(startIndex - 1 + pageSize, length);
    return `${startIndex} - ${endIndex} sur ${length}`;
  }  
}
