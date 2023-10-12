import { Injectable } from "@angular/core";
import { DbArrayRes, FormInstance, FormInstanceExt, FormMutate, FormQuery, IndexType } from "@codeffekt/ce-core-data";
import { Observable } from "rxjs";
import { CeFormsService } from "../services/ce-forms.service";
import { CeProjectsService } from "../services/ce-projects.service";


export interface ICeFormDataService {
    getForm(root: string, formQuery: FormQuery): Observable<DbArrayRes<FormInstanceExt>>;
    createFormArrayElt(formArrayField: string, formIndex: IndexType): Promise<FormInstance>;
    deleteFormArrayElt(formId: IndexType): Promise<void>;
    addFormAssocElts(formId: IndexType, elts: IndexType[], field?: string,): Promise<boolean>;
    removeFormAssocElts(formId: IndexType, elts: IndexType[], field?: string): Promise<boolean>;
}

@Injectable({
    providedIn: 'root'
})
export class CeFormDataService implements ICeFormDataService {

    constructor(protected apiService: CeFormsService, protected projectService: CeProjectsService) { }

    getForm(root: string, formQuery: FormQuery, useProject = true): Observable<DbArrayRes<FormInstanceExt>> {
        return useProject ? this.apiService.formsQuery(this.pid, formQuery) :
            this.apiService.getRawFormsQuery(formQuery);
    }

    createFormArrayElt(formArrayField: string, formIndex: IndexType): Promise<FormInstance> {
        return this.apiService.formMutation(this.pid, {
            type: "formArray",
            op: "create",
            indices: [formIndex],
            formArrayField: formArrayField,
        });
    }

    deleteFormArrayElt(formId: IndexType): Promise<void> {
        return this.apiService.formMutation(this.pid, {
            type: "form",
            op: "delete",
            indices: [formId]
        });
    }

    /**
     * 
     * @param root 
     * @param contextId le context id represente le projet, dans le cas non spécifié on prend le
     * projet courant
     * @returns 
     */
    createFormAssocElt(root: IndexType, contextId?: IndexType): Promise<FormInstance> {
        return this.apiService.formMutation(contextId ?? this.pid, {
            type: "form",
            op: "create",
            root
        });
    }

    addFormAssocElts(formId: string, elts: string[], field?: string, useProject = true): Promise<boolean> {
        const mutation: FormMutate = {
            type: "formAssoc",
            op: "add",
            ref: formId,
            formArrayField: field,
            indices: elts
        };
        return useProject ?
            this.apiService.formMutation(this.pid, mutation) :
            this.apiService.rawFormMutation(mutation);
    }

    removeFormAssocElts(formId: string, elts: string[], field?: string): Promise<boolean> {
        return this.apiService.formMutation(this.pid, {
            type: "formAssoc",
            op: "delete",
            ref: formId,
            formArrayField: field,
            indices: elts
        });
    }

    /**
     * 
     * @param elts 
     * @param contextId le context id represente le projet, dans le cas non spécifié on prend le
     * projet courant
     * @returns 
     */
    deleteFormAssocElts(elts: IndexType[], contextId?: IndexType): Promise<any> {
        return this.apiService.formMutation(contextId ?? this.pid, {
            type: "form",
            op: "delete",
            indices: elts,
        });
    }

    private get pid(): IndexType {
        return this.projectService.getCurrentProjectId();
    }
}