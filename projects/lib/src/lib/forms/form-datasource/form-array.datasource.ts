import {
    DbArrayRes, FormBlock,
    FormInstance, FormInstanceExt,
    FormQuery, FormUtils, IndexType
} from "@codeffekt/ce-core-data";
import { Observable } from "rxjs";
import { CeFormDataService } from "../form-data.service";
import { FormQueryDatasource } from "./form-query.datasource";

/**
    Facade pour gérer les éléments d'un tableau de formulaires,
     * chargement/reload des formulaires du tableau
     * créer et ajouter un formulaire
     * supprimer un formulaire
     * associer un ensemble de formulaires
     * dissocier un ensemble de formulaires
*/
export class FormArrayDatasource extends FormQueryDatasource<FormInstanceExt> {

    constructor(private apiService: CeFormDataService, public useProject = false) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.apiService.getForm(query.root, query, this.useProject);
    }

    protected wrap(form: FormInstanceExt): FormInstanceExt {
        return form;
    }

    createElt(block: FormBlock, context: FormInstance) {
        return this.createEltFromArray(block, context);
    }

    deleteElt(block: FormBlock, formId: IndexType, context: FormInstance) {
        return this.deleteEltFromArray(formId);
    }

    async addEltsFromAssoc(formId: IndexType, elts: IndexType[], field?: string) {
        await this.apiService.addFormAssocElts(formId, elts, field, this.useProject);
        this.reload();
    }

    async removeEltsFromAssoc(block: FormBlock, elts: IndexType[], context: FormInstance) {
        const ref = block.params?.ref || FormUtils.createFormAssocRef(context.id, block.field);
        await this.apiService.removeFormAssocElts(ref, elts);
        this.reload();
    }

    private async createEltFromArray(block: FormBlock, context: FormInstance) {
        await this.apiService.createFormArrayElt(block.field, context.id);
        this.reload();
    }

    private async deleteEltFromArray(formId: IndexType) {
        await this.apiService.deleteFormArrayElt(formId);
        this.reload();
    }
}