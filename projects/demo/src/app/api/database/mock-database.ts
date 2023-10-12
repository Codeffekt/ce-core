import { Injectable } from "@angular/core";
import {
    DbArrayRes, FormInstance,
    FormInstanceBase, FormInstanceExt,
    FormQuery, FormQueryField, FormUtils, FormWrapper, IndexType
} from "@codeffekt/ce-core-data";
import { Observable, of } from "rxjs";
import * as uuid from "uuid";
import { ARRAY_TABLE, DATABASE, MASKS_DATABASE, STYLES_DATABASE } from "./mock-data";

function filterWithFormRoot(query: FormQuery, forms: FormInstance[]) {
    return query.formRoot ?
        forms.filter(f => f.root === query.formRoot) : forms;
}

function filterWithQueryFields(query: FormQuery, forms: FormInstance[]) {
    return query.queryFields ? forms.filter(form => {
        const queryFields = query.queryFields as FormQueryField[];
        const field = queryFields[0].field;
        const value = queryFields[0].value;
        return FormWrapper.getFormValue(field, (form as FormInstanceBase)) === value;
    }) as FormInstanceExt[] : forms;
}

@Injectable({
    providedIn: 'root'
})
export class MockDatabase {

    database = DATABASE;
    masksDatabase = MASKS_DATABASE;
    stylesDatabase = STYLES_DATABASE;

    getFormQuery(root: IndexType, formQuery: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {


        const forms = filterWithQueryFields(
            formQuery,
            filterWithFormRoot(formQuery, this.getAllFormInstances()
            ));

        const res: DbArrayRes<FormInstanceExt> =
        {
            total: forms.length,
            limit: forms.length,
            offset: 0,
            elts: forms
        }
        return of(res);
    }

    getAllFormInstances() {
        return [].concat(...Object.values(this.database));
    }

    async getForm(id: IndexType) {
        const form = this.getAllFormInstances().find(form => form.id === id) as FormInstance;
        return form ? this.getExtFields(form) : undefined;
    }

    async getFormWrapper(id: IndexType) {
        const form = await this.getForm(id);
        if (!form) {
            return undefined;
        }
        const formWrapper = new FormWrapper(FormWrapper.createProps(form), this.deepcopy(form));
        return formWrapper;
    }

    async getFormMask(id: IndexType): Promise<FormInstance | null> {
        const form = await this.getForm(id);
        const maskForm = this.masksDatabase.find((formMask) =>
            !formMask.content.disabled?.value && formMask.content.root?.value === form?.root);
        
        console.log({form,maskDatabase: this.masksDatabase, maskForm});
            return maskForm;
    }

    async getFormStyle(id: IndexType): Promise<FormInstance | null> {
        const form = await this.getForm(id);
        return this.stylesDatabase.find((formStyle) =>
            !formStyle.content.disabled && formStyle.content.root?.value === form?.root);
    }

    async update(formInstance: FormInstance) {
        const index = this.getAllFormInstances().findIndex(form => form.id === formInstance.id);
        if (index) {
            this.database[index] = formInstance as any;
        }

        const formWrapper = new FormWrapper(FormWrapper.createProps(formInstance), this.deepcopy(formInstance));
        return formWrapper;
    }

    async createFormArrayElt(formArrayField: string, formIndex: IndexType) {

        // looking for formblock with field formarrayfield in order to find formroot
        const form = await this.getForm(formIndex);
        const formBlock = FormUtils.getBlocks(form).find(formBlock => formBlock.field === formArrayField);
        if (!formBlock) {
            throw new Error(`Cannot find form block with index: ${formArrayField}`)
        }

        // instantiate a form from formRoot
        const newForm = await this.createFormFromRoot(formBlock.root);
        newForm.content[formBlock.index].value = formIndex;

        // updating database with newly created form
        this.addFormInTable(newForm, ARRAY_TABLE);

        return newForm;
    }

    async deleteForm(formId: IndexType) {
        const formIdxPair = this.findFormInTables(formId).find(pair => pair.formIdx !== -1);
        if (formIdxPair) {
            this.removeIdxInTable(formIdxPair.formIdx, formIdxPair.table);
        }
    }

    private deepcopy<T>(o: T): T {
        return JSON.parse(JSON.stringify(o));
    }

    private async createFormFromRoot(formRootId: IndexType) {

        const formRoot = await this.getForm(formRootId);
        if (!formRoot) {
            throw new Error(`Cannot find form root with index ${formRootId}`)
        }

        const newForm: FormInstance = this.deepcopy(formRoot);
        newForm.id = uuid.v4();
        newForm.root = formRoot.id;
        newForm.ctime = new Date().getTime();

        // TODO:  add default value

        return newForm;
    }

    private findFormInTables(formId: IndexType): { table: string, formIdx: number }[] {
        return Object.entries(this.database).map(entry => ({
            table: entry[0],
            formIdx: entry[1].findIndex(f => f.id === formId)
        }));
    }

    private addFormInTable(form: FormInstance, table: string) {
        this.database[table].push(form);
    }

    private removeIdxInTable(idx: number, table: string) {
        this.database[table].splice(idx, 1);
    }

    private getExtFields(form: FormInstance): FormInstanceExt {
        const allForms = this.getAllFormInstances();
        const requiredFields = Object.values(form.content)
            .filter(block => block.root && block.type === "index" && block.value !== undefined)
            .map(block => ({ field: block.field, form: allForms.find(f => f.id === block.value) }))
            .filter(pair => pair.form);
        return {
            ...form,
            fields: requiredFields.reduce((prev, cur) => ({ [cur.field]: cur.form, ...prev }), {})
        };
    }


}