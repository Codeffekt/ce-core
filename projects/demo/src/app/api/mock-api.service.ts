import { Injectable } from "@angular/core";
import { ICeFormDataService } from "@codeffekt/ce-core";
import { DbArrayRes, FormInstance, FormInstanceExt, FormQuery, FormWrapper, IndexType } from "@codeffekt/ce-core-data";
import { Observable } from "rxjs";
import { MockDatabase } from './database/mock-database';

@Injectable({
    providedIn: 'root'
})
export class MockApiService implements ICeFormDataService {

    constructor(private database: MockDatabase) {
    }

    getAllFormInstances(): FormInstanceExt[] {
        return this.database.getAllFormInstances();
    }

    getForm(root: IndexType, formQuery: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.database.getFormQuery(root, formQuery);
    }

    async getFormById(id: IndexType): Promise<FormInstanceExt> {
        const form = await this.database.getForm(id);
        if (!form) {
            throw new Error(`Invalid id ${id}`);
        }
        return form;
    }

    updateForm(formInstance: FormInstance): Promise<FormWrapper<any>> {
        return this.database.update(formInstance);
    }

    createFormArrayElt(formArrayField: string, formIndex: IndexType): Promise<FormInstance> {
        return this.database.createFormArrayElt(formArrayField, formIndex);
    }

    deleteFormArrayElt(formId: IndexType): Promise<void> {
        return this.database.deleteForm(formId);
    }

    async getFormMaskById(id: IndexType): Promise<FormInstance> {
        const formMask = await this.database.getFormMask(id);
        if (!formMask) {
            throw new Error(`Invalid id ${id}`);
        }
        console.log(id);
        return formMask;
    }

    async getFormStyleById(id: IndexType): Promise<FormInstance> {
        const form = await this.database.getFormStyle(id);
        if (!form) {
            throw new Error(`Invalid id ${id}`);
        }
        return form;
    }

    addFormAssocElts(formId: string, elts: string[], field?: string): Promise<boolean> {
        // TODO
        return Promise.resolve(true);
    }

    removeFormAssocElts(formId: string, elts: string[], field?: string): Promise<boolean> {
        // TODO
        return Promise.resolve(true);
    }
}