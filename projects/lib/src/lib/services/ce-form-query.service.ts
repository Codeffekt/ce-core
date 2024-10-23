import { Injectable } from "@angular/core";
import { FormQuery, FormQuerySortField, FormRoot } from "@codeffekt/ce-core-data";
import { Observable, ReplaySubject } from "rxjs";
import { PartialDatasource } from "../forms/form-datasource";
import { ShareableDataSource } from "../forms/form-datasource/shareable.datasource";
import {
    CeFormQueryBookmarks,
    FormQueryBookmark, FormQueryBuilder,
    FormQueryLogicBuilder
} from "../forms/forms-query";

export interface CeFormQueryEvt {
    type: 'pagination-first-page' | 'active-bookmark' | 'model'
    data?: FormQueryBookmark;
}

@Injectable()
export class CeFormQueryService<T = any> {

    private datasource!: ShareableDataSource<T>;
    private queryBuilder!: FormQueryBuilder;
    private evt$: ReplaySubject<CeFormQueryEvt> = new ReplaySubject(1);
    private model!: FormRoot;
    private logicBuilder: FormQueryLogicBuilder = new FormQueryLogicBuilder();
    private bookmarks$: ReplaySubject<CeFormQueryBookmarks> = new ReplaySubject(1);
    public query$: ReplaySubject<FormQuery> = new ReplaySubject(1);

    constructor(
    ) { }

    setDatasource(ds: PartialDatasource<T>) {

        if (this.datasource) {
            this.datasource.disconnect(null as any);
        }

        this.datasource = new ShareableDataSource(ds);

        return this.datasource;
    }

    setQueryBuilder(qb: FormQueryBuilder) {
        this.queryBuilder = qb;
    }

    getModel(): FormRoot {
        return this.model;
    }

    setModel(root: FormRoot) {
        this.model = root;
        this.logicBuilder.setModel(this.model);
        this.evt$.next({ type: "model" });
    }

    setBookmarks(bookmarks: CeFormQueryBookmarks) {
        this.bookmarks$.next(bookmarks);
    }

    bookmarks() {
        return this.bookmarks$;
    }

    getDatasource() {
        return this.datasource;
    }

    connect(): Observable<readonly T[]> {
        return this.datasource.connect(null as any);
    }

    evt() {
        return this.evt$;
    }

    getTotal() {
        return this.datasource.getDatasource().length;
    }

    setPagination(pageIndex: number, pageSize: number) {
        this.queryBuilder?.setPagination(pageIndex, pageSize);
    }

    setPaginationFirstPage() {
        this.queryBuilder?.setPaginationFirstPage();
        this.evt$.next({ type: "pagination-first-page" });
    }

    setActiveBookmark(bookmark: FormQueryBookmark) {
        this.setQueryBuilder(bookmark.formQuery);
        this.evt$.next({ type: "active-bookmark", data: bookmark });
    }

    setFilter(filter: string) {
        const logic = this.logicBuilder.fromFilter(filter);
        if (logic) {
            this.queryBuilder?.setQueryFieldLogic(logic);
        } else {
            this.queryBuilder?.setFilter(filter);
        }
    }

    clearFilter() {
        this.queryBuilder?.clearQueryFieldLogic();
        this.queryBuilder?.clearFilter();
    }

    getSort() {
        return this.queryBuilder.getSort();
    }

    setSort(sf: FormQuerySortField) {
        this.queryBuilder?.clearSortFields();
        this.queryBuilder?.setSort(sf);
    }

    load() {
        if (!this.queryBuilder || !this.datasource) {
            //throw Error('Missing queryBuilder or datasource. Please call setDatasource or/and setQueryBuilder');
            return;
        }

        const query = this.queryBuilder.create();
        this.datasource.getDatasource().load(query);

        this.query$.next(query);
    }
}