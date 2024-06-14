import { Observable } from "rxjs";
import { FormQuery, DbArrayRes, FormRoot } from "@codeffekt/ce-core-data";
import { FormQueryDatasource } from "./form-query.datasource";
import { CeFormsService } from "../../services/ce-forms.service";

export class FormsRootDataSource extends FormQueryDatasource<FormRoot, FormRoot> {
    constructor(
        private formsService: CeFormsService
    ) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormRoot>> {
        return this.formsService.getRawFormsRootQuery(query);
    }

    protected wrap(form: FormRoot): FormRoot {
        return form;
    }    
}