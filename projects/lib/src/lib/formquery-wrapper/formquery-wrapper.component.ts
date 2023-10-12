import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinct, filter, map } from 'rxjs';
import { CeFormQueryService } from '../services/ce-form-query.service';

@UntilDestroy()
@Component({
  selector: 'ce-formquery-wrapper',
  templateUrl: './formquery-wrapper.component.html',
  styleUrls: ['./formquery-wrapper.component.scss']
})
export class FormQueryWrapperComponent<T> implements OnInit {

  @Input() searchEnabled!: boolean;
  @Input() pageSize = 10;
  @Input() paginationEnabled!: boolean;
  @Input() pageSizeOptions = [5, 10, 20];
  @Input() bookmarksEnabled!: boolean;
  @Input() useQueryParams = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private queryService: CeFormQueryService<T>
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  private initDataSource() {
    if (!this.useQueryParams) {
      if (this.paginationEnabled) {
        this.queryService.setPagination(0, this.pageSize);
      }
      this.queryService.load()
      return;
    } else {
      this.observeQueryChanges();
      this.observeQueryParamsChanges();
    }
  }

  private observeQueryParamsChanges() {
    this.route.queryParams.pipe(
      untilDestroyed(this),
      filter(_ => !history.state?.preventChange),
    )
      .subscribe(qp => {
        if (!qp.pageIndex || !qp.pageSize) {
          this.queryService.setPaginationFirstPage();
          this.queryService.load();
        } else {
          this.queryService.setPagination(qp.pageIndex, qp.pageSize);
          this.queryService.load();
        }
      });
  }

  private observeQueryChanges() {
    this.queryService.query$.pipe(
      untilDestroyed(this),
      map(query => ({ offset: query.offset, limit: query.limit })),
      distinct(),
    ).subscribe(query => {
      this.updateRouteSilent(query.offset, query.limit);
    });
  }

  private updateRouteSilent(offset: number, pageSize: number) {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: { pageIndex: offset / pageSize, pageSize },
        state: {
          preventChange: true
        }
      });
  }
}
