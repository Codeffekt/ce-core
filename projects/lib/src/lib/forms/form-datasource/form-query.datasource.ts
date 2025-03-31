import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormQuery, DbArrayRes, FormInstanceExt } from '@codeffekt/ce-core-data';
import { PartialDatasource } from './partial.datasource';

export type FormQueryFunc<T> = (query: FormQuery) => Observable<DbArrayRes<T>>;


export abstract class FormQueryDatasource<T = any, U = FormInstanceExt> extends PartialDatasource<T> {

    private query!: FormQuery;

    constructor() {
        super();
    }

    async load(query: FormQuery) {
        this.query = query;
        await super.load(this.query);
    }

    async reload() {
        await super.load(this.query);
    }

    protected queryData(query: FormQuery): Observable<T[]> {
        return this.queryDb(query).pipe(
            tap(res => this.updateDataCount(res.total)),
            map(res => res.elts.map(form => this.wrap(form, res)))
        );
    }

    protected abstract queryDb(query: FormQuery): Observable<DbArrayRes<U>>;

    protected abstract wrap(form: U, res?: DbArrayRes<U>): T;
    
}