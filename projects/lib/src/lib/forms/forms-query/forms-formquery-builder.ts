import { FormQuerySortField } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";

const META_FIELD_VALUE = "$";

export class FormsFormQueryBuilder extends FormQueryBuilder {

    constructor() {
        super();
    }

    setFilter(filterValue: string) {
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

    setSort(sortField: FormQuerySortField) {
        if (sortField) {
            if (sortField.field.startsWith(META_FIELD_VALUE)) {
                super.setSort({
                    ...sortField,
                    field: sortField.field.slice(1),
                    onMeta: true
                });
            }
            else {
                super.setSort(sortField);
            }
        }
    }
}