import { FormBlock, FormQuery } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "../../forms/forms-query/formquery.builder";

export class CeProjectAssocFormQueryBuilder extends FormQueryBuilder {

    static fromBlock(block: FormBlock) {
        return new CeProjectAssocFormQueryBuilder(block);
    }

    private constructor(private block: FormBlock) {
        super();
        this.setExtMode(true);
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

    create(): FormQuery {
        return {
            ...super.create(),
            table: this.block.field
        };
    }
}
