import { FormQueryBuilder } from "@codeffekt/ce-core";

export class DataFormQueryBuilder extends FormQueryBuilder {

    constructor() {
        super();
    }

    setFilter(filterValue: string) {
        if (filterValue === "") {
            //this.clearQueryField("name");
            this.clearQueryFieldLogic();
        } else {
            /* this.setQueryField({
                field: "name",
                op: "~~*",
                value: `${filterValue}`
            }); */
            this.setQueryFieldLogic({
                or: [{
                    field: "name",
                    op: "~~*",
                    value: `${filterValue}`
                },{
                    field: "weight",
                    op: "~~*",
                    value: `${filterValue}`
                }]
            });
        }
    }
}