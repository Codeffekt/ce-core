import {
    FormBlock, FormInstance,
    FormProject, FormQuery,
    FormUtils, IndexType
} from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";

export function isContextProject(context: FormInstance) {
    return context.root === FormProject.ROOT;
}

// Pour remplace l'utilisation de contexte de type project
// afin de permettre le passage en mode formulaire des projets
// on bascule sur l'assoc si l'index n'est pas définit.
// De plus le type formAssoc va pouvoir fusionner avec
// le type formArray
export function isBlockAssoc(block: FormBlock) {
    return block.type === "formAssoc" ||
    (block.type === "formArray" && block.index === undefined);
}

export class FormQueryArrayBuilder extends FormQueryBuilder {

    private extra: Partial<FormQuery> = {};
    private ref: IndexType;    

    constructor() {
        super();
    }

    static fromBlock(formBlock: FormBlock, context: FormInstance) {

        const query = new FormQueryArrayBuilder();

        if (formBlock.params?.extMode) {
            query.setExtMode(true);
        }

        if (formBlock.params?.query) {
            query.setExtra(formBlock.params.query);
        }

        query.setRoot(formBlock.root);

        if (isBlockAssoc(formBlock)) {
            query.ref = formBlock.params?.ref ||
                FormUtils.createFormAssocRef(context.id, formBlock.field);
        } else {
            query.setQueryField({
                field: formBlock.index,
                value: context.id
            });
        }

        /* if (isContextProject(context)) {
            query.ref = formBlock.params?.ref ||
                FormUtils.createFormAssocRef(context.id, formBlock.field);
        } else {
            query.setQueryField({
                field: formBlock.index,
                value: context.id
            });
        } */

        return query;
    }

    setExtra(extra: Partial<FormQuery>) {
        this.extra = extra;
    }

    create(): FormQuery {
        return {
            ...super.create(),
            ...this.extra,
            ref: this.ref,            
        };
    }

    setFilter(value: string): void { }

    clearFilter(): void { }
}