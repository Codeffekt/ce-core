import { FormQueryBuilder } from "@codeffekt/ce-core";
import { AccountSettings } from "@codeffekt/ce-core-data";

export class MyFormsQueryBuilder extends FormQueryBuilder {

    constructor(user: AccountSettings) {
        super();
        this.setQueryField({
            field: "author",
            op: "=",
            value: user.id,
            onMeta: true
        });
    }

    clearFilter(): void {        
    }
}