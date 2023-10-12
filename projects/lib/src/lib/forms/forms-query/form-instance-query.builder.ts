import { FormInstance, FormQuery, FormQueryField, IndexType } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "./formquery.builder";

export interface FormQueryBookmark {
    id: IndexType;
    title: string;
    page: string;
    formQuery: FormQueryBuilder;
}

export type CeFormQueryBookmarks = FormQueryBookmark[];

export interface FormQueryVariables {
    author: string;
}

export interface FormQueryPage {
    page: string;
    bookmarks: CeFormQueryBookmarks;
}

type VariableFunc = () => void;

export class FormInstanceQueryBuilder extends FormQueryBuilder {    

    private variablesFunc:  VariableFunc[] = [];

    constructor(protected form: FormInstance, private variables: FormQueryVariables) {
        super();
        this.createVariablesFunc();
    }

    static createBookmark(form: FormInstance, variables: FormQueryVariables): FormQueryBookmark {        
        return {
            id: form.id,
            title: form.content.name.value,
            page: form.content.page.value,
            formQuery: new FormInstanceQueryBuilder(form, variables)
        };
    }

    create(): FormQuery {
        this.applyVariablesFunc();
        return {
            ...super.create(),
            ...this.form.content.query.value
        };
    }
    
    private createVariablesFunc() {
        const query = this.form.content.query.value as FormQuery;
        if (Array.isArray(query.queryRootFields)) {
            this.variablesFunc = this.variablesFunc.concat(
                (query.queryRootFields.filter((q: FormQueryField) => q.value === "((now))") as FormQueryField[])
                .map(qf => () => qf.value = Date.now())
            );

            this.variablesFunc = this.variablesFunc.concat(
                (query.queryRootFields.filter((q: FormQueryField) => q.value === "((author))") as FormQueryField[])
                .map(qf => () => qf.value = this.variables.author)
            );
        }
    }
    
    private applyVariablesFunc() {
        for(const func of this.variablesFunc) {
            func();
        }
    }
}