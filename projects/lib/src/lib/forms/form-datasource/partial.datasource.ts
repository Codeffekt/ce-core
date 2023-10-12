import { ReactiveDatasource } from './reactive.datasource';

export abstract class PartialDatasource<T> extends ReactiveDatasource<T> {

  length = 0;  

  protected isEnd: boolean;
  protected accumulate: boolean;

  protected updateDataCount(count: number) {
    this.length = count;
  }

  protected updateData(data: T[]) {
    this.isEnd = data.length === this.length;
    super.updateData(this.accumulate ? [...this.data, ...data] : data);
  }
}
