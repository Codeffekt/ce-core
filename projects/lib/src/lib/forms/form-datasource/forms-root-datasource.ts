import { Observable } from "rxjs";
import { FormQuery, DbArrayRes, FormRoot, FormWrapper, FormInstance } from "@codeffekt/ce-core-data";
import { FormQueryDatasource } from "./form-query.datasource";
import { CeFormsService } from "../../services/ce-forms.service";

export class FormsRootDataSource extends FormQueryDatasource<FormWrapper, FormRoot> {
    constructor(
        private formsService: CeFormsService
    ) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormRoot>> {
        return this.formsService.getRawFormsRootQuery(query);
    }

    protected wrap(form: FormInstance): FormWrapper {
        return FormWrapper.fromForm(form);
    }
}