import { FormBlock, FormInstanceBase, FormUtils, IndexType } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";

export class FormQueryAssocBuilder extends FormQueryBuilder {

    private ref!: IndexType;

    constructor() {
        super();
    }

    setAssoc(formBlock: FormBlock, formInstance: FormInstanceBase) {
        this.ref = formBlock.params?.ref || FormUtils.createFormAssocRef(formInstance.id, formBlock.field);
        if (formBlock.params?.extMode) {
            this.setExtMode(true);
        }
    }

    create() {
        return {
            ...super.create(),
            ref: this.ref
        };
    }
}