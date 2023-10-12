import { FormQuerySortField } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";

export class CeAppsFormQueryBuilder extends FormQueryBuilder {

    constructor() {
        super();
        this.setQueryRootField({
            field: "root",
            op: "=",
            value: "forms-app"
        });
    }

    override setFilter(filterValue: string) {
        if (filterValue === "") {
            this.clearQueryField("title");
        } else {
            this.setQueryField({
                field: "title",
                op: "~~*",
                value: `%${filterValue}%`
            });
        }
    }

    override setSort(sortField: FormQuerySortField) {        
        this.clearRootSort();
        this.setRootSort(sortField);        
    }
}