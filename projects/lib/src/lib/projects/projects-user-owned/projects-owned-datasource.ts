import { DbArrayRes, FormInstanceExt, FormProjectWrapper, FormQuery } from "@codeffekt/ce-core-data";
import { Observable } from "rxjs";
import { FormQueryDatasource } from "../../forms/form-datasource";
import { CeFormsService } from "../../services/ce-forms.service";

export class ProjectsOwnedDatasource extends FormQueryDatasource<FormProjectWrapper> {

    constructor(private formsService: CeFormsService) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.formsService.getRawFormsQuery({ ...query, extMode: true });
    }

    protected wrap(form: FormInstanceExt): FormProjectWrapper {
        return new FormProjectWrapper(form);
    }

}