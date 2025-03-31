import { FormQueryField, FormRoot, FormUtils } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";

const ALLOWED_META_FIELDS = ["$id", "$root", "$title"];
const DEFAULT_SEARCH_FIELDS = ["$id", "$root", "$title"];
const META_FIELD_OP = "$";

export class FormQuerySearchBuilder extends FormQueryBuilder {

    private searchFields: FormQueryField[] = [];

    constructor(private model: FormRoot) {
        super();
        this.initSearchFields();
    }

    clearFilter() {
        this.clearQueryFieldLogic();
    }

    setFilter(value: string) {
        if (!this.searchFields.length) {
            return;
        }

        this.setQueryFieldLogic({
            or:
                this.searchFields.map(sf => ({
                    ...sf,
                    value: `%${value}%`,
                }))
        });
    }

    private initSearchFields() {
        const fields = this.model.params?.fields ?? DEFAULT_SEARCH_FIELDS;
        this.searchFields = fields.map(
            (f: string) => this.createQueryFieldFromField(f))
            .filter(block => block !== undefined);
    }

    private createQueryFieldFromField(field: string): FormQueryField | undefined {
        if(field.startsWith(META_FIELD_OP) && !ALLOWED_META_FIELDS.includes(field)) {
            return undefined;
        }

        const block = FormUtils.retrieveBlockFromField(this.model, field);
        return block.type === "text" ? {
            field: block.field,
            op: "~~*",
            onMeta: ALLOWED_META_FIELDS.includes(field),
        } : undefined;
    }
}