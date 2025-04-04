import { DbArrayRes, FormInstanceExt, FormQuery } from "@codeffekt/ce-core-data";
import { CeFormsService } from "../../services/ce-forms.service";
import { FormQueryDatasource } from "./form-query.datasource";
import { Observable } from "rxjs";

export class FormWrapperClassDataSource<T> extends FormQueryDatasource<T> {

    constructor(
        private formsService: CeFormsService,
        private typeConstr: new (form: FormInstanceExt) => T,
    ) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.formsService.getRawFormsQuery(query);
    }

    protected wrap(form: FormInstanceExt): T {
        return new this.typeConstr(form);
    }

}