import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";

export abstract class ReactiveDatasource<T> extends DataSource<T> {

  protected _data: T[] = [];
  protected data$ = new BehaviorSubject<T[]>([]);

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    this.data$ = new BehaviorSubject<T[]>(this._data);
    return this.data$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.data$.complete();
  }

  load(...params: any) {
    this.queryData().subscribe(_ => this.updateData(_));
  }

  protected abstract queryData(...params: any): Observable<T[]>;

  protected updateData(_data: T[]) {
    this._data = _data;
    this.data$.next(this._data);
  }

  public remove(item: T) {
    const idx = this._data.indexOf(item);

    if (idx === -1) {
      return;
    }

    this._data.splice(idx, 1);
    this.updateData(this._data);
  }

  public add(item: T, sortFc?: (t1: T, t2: T) => number) {

    this._data.push(item);

    if (sortFc) {
      this._data.sort(sortFc);
    }

    this.updateData(this._data);
  }

  get data() {
    return this._data;
  }
}
