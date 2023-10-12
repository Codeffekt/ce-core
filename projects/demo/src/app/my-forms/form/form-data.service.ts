import { Injectable } from "@angular/core";
import { DbArrayRes, FormInstance, FormInstanceExt, FormMutate, FormQuery, IndexType } from "@codeffekt/ce-core-data";
import { Observable } from "rxjs";
import { CeFormsService, ICeFormDataService } from "@codeffekt/ce-core";

@Injectable({
    providedIn: 'root'
})
export class FormDataService implements ICeFormDataService {

    constructor(protected apiService: CeFormsService) { }

    getForm(root: string, formQuery: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.apiService.getRawFormsQuery(formQuery);
    }

    createFormArrayElt(formArrayField: string, formIndex: IndexType): Promise<FormInstance> {
        return this.apiService.rawFormMutation({
            type: "formArray",
            op: "create",
            indices: [formIndex],
            formArrayField: formArrayField,
        });
    }

    deleteFormArrayElt(formId: IndexType): Promise<void> {
        return this.apiService.rawFormMutation({
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
        return this.apiService.rawFormMutation({
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
        return this.apiService.rawFormMutation(mutation);
    }

    removeFormAssocElts(formId: string, elts: string[], field?: string): Promise<boolean> {
        return this.apiService.rawFormMutation({
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
        return this.apiService.rawFormMutation({
            type: "form",
            op: "delete",
            indices: elts,
        });
    }  
}