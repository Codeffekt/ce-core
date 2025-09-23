import {
    FormBlock, FormBlockArray, FormInstance,
    FormProject, FormQuery,
    FormQueryFieldExpr,
    FormQueryFieldLogic,
    FormUtils, IndexType
} from "@codeffekt/ce-core-data";
import { FormQueryBuilder, isQueryFieldLogic } from "./formquery.builder";

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
    
    private extraQueryFields?: FormQueryFieldLogic | FormQueryFieldExpr[];
    private ref!: IndexType;

    constructor() {
        super();
    }

    static fromBlock(formBlock: FormBlockArray, context: FormInstance) {

        const query = new FormQueryArrayBuilder();

        if (formBlock.params?.query?.extMode) {
            query.setExtMode(true);
        }

        if (formBlock.params?.query) {
            query.setExtra(formBlock.params.query);
        }

        if (formBlock.params?.useCategory) {
            query.setCat(formBlock.root!);
        } else {
            query.setRoot(formBlock.root!);
        }


        query.ref = formBlock.params?.ref ||
            FormUtils.createFormAssocRef(context.id, formBlock.field);

        return query;
    }

    setExtra(extra: Partial<FormQuery>) {        
        this.extraQueryFields = extra.queryFields;
    }

    create(): FormQuery {
        if (this.extraQueryFields) {
            this.addQueryFieldLogic(this.extraQueryFields);
        }

        return {
            ...super.create(),            
            ref: this.ref,
        };
    }

    setFilter(value: string): void { }

    clearFilter(): void { }

    private addQueryFieldLogic(queryFields: FormQueryFieldLogic | FormQueryFieldExpr[]) {
        if (!this.queryFieldLogic) {
            this.setQueryFieldLogic(queryFields);
        } else if (isQueryFieldLogic(this.queryFieldLogic)) {
            if (isQueryFieldLogic(queryFields)) {
                this.setQueryFieldLogic([this.queryFieldLogic, queryFields]);
            } else if (Array.isArray(queryFields)) {
                this.setQueryFieldLogic({
                    and: [this.queryFieldLogic, ...queryFields]
                });
            }
        } else if (Array.isArray(this.queryFieldLogic)) {
            if (isQueryFieldLogic(queryFields)) {
                this.setQueryFieldLogic({
                    and: [...this.queryFieldLogic, queryFields]
                });
            } else if (Array.isArray(queryFields)) {
                this.setQueryFieldLogic([
                    ...this.queryFieldLogic,
                    ...queryFields
                ]);
            }
        }
    }
}