import { FormQueryBuilder } from "../../forms/forms-query/formquery.builder";

export class CeProjectAssocFormQueryBuilder extends FormQueryBuilder {

    constructor() {
        super();
    }

    setFilter(filterValue: string) {
        if (filterValue === "") {
            this.clearQueryField("name");
        } else {
            this.setQueryField({
                field: "name",
                op: "~~*",
                value: `%${filterValue}%`
            });
        }
    }

    clearFilter(): void {

    }
}
