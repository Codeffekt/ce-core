import { DbArrayRes, FormInstanceExt, FormQuery, IndexType } from "@codeffekt/ce-core-data";
import { Observable } from "rxjs";
import { CeFormDataService } from "../form-data.service";
import { FormQueryDatasource } from "./form-query.datasource";

export class FormAssocDatasource extends FormQueryDatasource<FormInstanceExt> {

    useProject = true;

    constructor(private apiService: CeFormDataService) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.apiService.getForm(query.root!, query, this.useProject);
    }

    protected wrap(form: FormInstanceExt): FormInstanceExt {
        return form;
    }

    async addElts(formId: IndexType, elts: IndexType[], field?: string) {
        await this.apiService.addFormAssocElts(formId, elts, field, this.useProject);
        this.reload();
    }

    async createElt(root: IndexType) {
        await this.apiService.createFormAssocElt(root);
        this.reload();
    }

    async removeElts(formId: IndexType, elts: IndexType[], field?: string) {
        await this.apiService.removeFormAssocElts(formId, elts, field);
        this.reload();
    }

    async deleteElts(elts: IndexType[]) {
        await this.apiService.deleteFormAssocElts(elts);
        this.reload();
    }
}