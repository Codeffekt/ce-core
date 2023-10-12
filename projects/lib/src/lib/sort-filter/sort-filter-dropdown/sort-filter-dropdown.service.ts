import { Injectable } from '@angular/core';
import { FormRoot } from '@codeffekt/ce-core-data';
import { filter, Observable, ReplaySubject, Subscription, tap } from 'rxjs';
import { CeFormQueryService } from '../../services';
import { FormQuerySortFieldWithLabel, SortFiltersBuilder } from './sort-filters.builder';

@Injectable()
export class SortFilterDropdownService {

    private model: FormRoot;
    private subscription: Subscription = new Subscription();
    private sortFilters: FormQuerySortFieldWithLabel[] = [];
    private sortFilters$ = new ReplaySubject<FormQuerySortFieldWithLabel[]>(1);

    constructor(private queryService: CeFormQueryService) {
        this.initModel();
        this.listenModel();
    }

    destroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    sortFiltersValues(): Observable<FormQuerySortFieldWithLabel[]> {
        return this.sortFilters$;
    }

    private initModel() {
        const model = this.queryService.getModel();
        this.setModel(model);
    }

    private listenModel() {
        this.subscription.add(
            this.queryService.evt()
                .pipe(
                    filter(evt => evt.type === 'model'))
                .subscribe(_ => this.setModel(this.queryService.getModel())
                )
        );
    }

    private updateSortFilters() {
        this.sortFilters = new SortFiltersBuilder().withModel(this.model).build();
        this.sortFilters$.next(this.sortFilters);
    }

    private setModel(model: FormRoot) {
        this.model = model;
        this.updateSortFilters();
    }
}