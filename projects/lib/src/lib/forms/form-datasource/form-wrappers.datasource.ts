import { Observable } from "rxjs";
import { FormInstance, FormQuery, DbArrayRes, FormWrapper } from "@codeffekt/ce-core-data";
import { FormQueryDatasource } from "./form-query.datasource";
import { CeFormsService } from "../../services/ce-forms.service";

export class FormWrappersDataSource extends FormQueryDatasource<FormWrapper> {
    constructor(
        private formsService: CeFormsService
    ) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstance>> {
        return this.formsService.getRawFormsQuery(query);
    }

    protected wrap(form: FormInstance): FormWrapper {
        return FormWrapper.fromForm(form);
    }
}