import { Subject, Observable } from 'rxjs';

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
  filter?: string;
}

export class PaginationHandler {

  public paginationState: PaginationState;
  protected paginationChanged$: Subject<PaginationState>;

  constructor(pageIndex: number = 0, pageSize: number = 0, filter?: string) {

    this.paginationState = { pageIndex, pageSize, filter };
    this.paginationChanged$ = new Subject();
  }

  protected connect(): Observable<PaginationState> {
    return this.paginationChanged$.asObservable();
  }

  protected disconnect() {
    this.paginationChanged$.complete();
  }

  public updatePageIndex(pageIndex: number) {
    this.paginationState.pageIndex = pageIndex;
  }

  public updatePageSize(pageSize: number) {
    this.paginationState.pageSize = pageSize;
  }

  public update(pageIndex: number, pageSize: number, filter?: string) {
    this.paginationState.pageIndex = pageIndex;
    this.paginationState.pageSize = pageSize;
    this.paginationState.filter = filter;
    this._update();
  }

  private _update() {
    this.paginationChanged$.next(this.paginationState);
  }

  reload() {
    this._update();
  }

  getState(): PaginationState {
    return this.paginationState;
  }
}
