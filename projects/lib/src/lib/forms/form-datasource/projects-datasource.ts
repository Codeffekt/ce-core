import { Observable } from "rxjs";
import {
    DbArrayRes, FormQuery,
    FormProjectWrapper, FormInstanceExt
} from "@codeffekt/ce-core-data";
import { FormQueryDatasource } from "./form-query.datasource";
import { CeFormsService } from "../../services/ce-forms.service";

export class ProjectsDataSource extends FormQueryDatasource<FormProjectWrapper> {

    constructor(
        private formsService: CeFormsService
    ) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.formsService.getRawFormsQuery(query);
    }

    protected wrap(form: FormInstanceExt): FormProjectWrapper {
        return new FormProjectWrapper(form);
    }


}