import { FormQuerySortField } from "@codeffekt/ce-core-data";
import { map } from "rxjs"
import { FormQuerySortFieldWithLabel, SortFiltersBuilder } from "./sort-filters.builder";

export class SortFilterMapper {

    static map(sortFilter: FormQuerySortField): FormQuerySortFieldWithLabel {
        const filter = SortFiltersBuilder.META_SORT_FILTERS.find(filter => filter.field === sortFilter.field);
        return { ...filter, ...sortFilter } as any;
    }
}