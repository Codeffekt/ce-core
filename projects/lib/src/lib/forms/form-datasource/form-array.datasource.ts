import { DbArrayRes, FormBlock, FormInstance, FormInstanceExt, FormQuery, FormUtils, IndexType } from "@codeffekt/ce-core-data";
import { Observable } from "rxjs";
import { CeFormDataService } from "../form-data.service";
import { isBlockAssoc } from "../forms-query/formquery-array.builder";
import { FormQueryDatasource } from "./form-query.datasource";

/*
    La gestion de la creation et de la suppression d'un formulaire d'un tableau dépend
    du contexte dans lequel il se trouve. 
    (a). Si le tableau se trouve au niveau d'un assoc, alors il faut ajouter / supprimer
    en utilisant createFormAssocElt et deleteFormAssocElt
    (b). Le tableau se trouve au niveau d'un array, alors il faut ajouter / supprimer
    en utilisant createFormArrayElt et deleteFormArrayElt
    Pour savoir dans quel contexte on se trouve, on reçoit le block en paramètre, 
    la présence d'index du block nous indique si l'on se trouve en présence d'un assoc
    ou pas.    
*/
export class FormArrayDatasource extends FormQueryDatasource<FormInstanceExt> {
    
    constructor(private apiService: CeFormDataService, public useProject = true) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.apiService.getForm(query.root, query, this.useProject);
    }

    protected wrap(form: FormInstanceExt): FormInstanceExt {
        return form;
    }

    createElt(block: FormBlock, context: FormInstance) {
        return isBlockAssoc(block) ?
            this.createEltFromAssoc(block, context) : this.createEltFromArray(block, context);
    }

    async deleteElt(block: FormBlock, formId: IndexType, context: FormInstance) {
        return isBlockAssoc(block) ?
            this.deleteEltFromAssoc(formId, context) : this.deleteEltFromArray(formId);
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

    private async createEltFromAssoc(block: FormBlock, context: FormInstance) {
        await this.apiService.createFormAssocElt(block.root, context.id);
        this.reload();
    }

    private async deleteEltFromArray(formId: IndexType) {
        await this.apiService.deleteFormArrayElt(formId);
        this.reload();
    }

    private async deleteEltFromAssoc(formId: IndexType, context: FormInstance) {
        await this.apiService.deleteFormAssocElts([formId], context.id);
        this.reload();
    }
}