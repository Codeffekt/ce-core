import { delay, filter, map } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PaginationHandler, PaginationState } from './pagination-handler';
import { MatPaginator } from '@angular/material/paginator';

const MAX_PAGE_SIZE = 50;

export class PaginatorURLHandler extends PaginationHandler {

  subscription = new Subscription();
  filter!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paginator: MatPaginator,
    private defaultPageSize = 10,
  ) { super(); }

  connect(): Observable<PaginationState> {
    this.observePaginatorChanges();
    this.observeQueryParamsChanges();
    return super.connect();
  }

  disconnect() {
    super.disconnect();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  applyFilter(filter: string) {
    this.filter = filter;
    this.paginator.pageIndex = 0;
    this.updateRoute(this.paginator.pageIndex, this.paginator.pageSize, this.filter);
  }

  reset() {
    this.paginator.pageIndex = 0;
    this.updateRouteSilent(this.paginator.pageIndex, this.paginator.pageSize);
  }

  private observePaginatorChanges() {
    this.subscription.add(
      this.paginator.page
        .subscribe(_ => this.updateRoute(this.paginator.pageIndex, this.paginator.pageSize, this.filter))
    );
  }

  private observeQueryParamsChanges() {
    this.subscription.add(
      this.route.queryParams.pipe(
        delay(0), // Use for prevent ExpressionHasChanged
        filter(_ => !history.state?.preventChange),
        map((params: Params) => {                    
          this.paginator.pageIndex = isNaN(params.pageIndex) ? 0 : parseInt(params.pageIndex.toString());
          this.paginator.pageSize = isNaN(params.pageSize) ?
            this.defaultPageSize : Math.min(parseInt(params.pageSize.toString()), MAX_PAGE_SIZE);
          this.filter = params.filter
          const paginationState: PaginationState = {
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            filter: this.filter
          };
          return paginationState
        }),
      ).subscribe(paginationState => this.update(paginationState.pageIndex, paginationState.pageSize, paginationState.filter)));
  }

  private updateRoute(pageIndex: number, pageSize: number, filter?: string) {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: { pageIndex, pageSize, filter },
      });
  }

  private updateRouteSilent(pageIndex: number, pageSize: number, filter?: string) {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: { pageIndex, pageSize, filter },      
        state: {
          preventChange: true
        }
      });
  }
}
