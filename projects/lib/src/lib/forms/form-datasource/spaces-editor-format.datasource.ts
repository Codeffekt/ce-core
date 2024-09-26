import { Observable } from "rxjs";
import {
    DbArrayRes, FormQuery,
    FormInstanceExt,
    FormSpaceEditorFormatWrapper
} from "@codeffekt/ce-core-data";
import { FormQueryDatasource } from "./form-query.datasource";
import { CeFormsService } from "../../services/ce-forms.service";

export class SpacesEditorFormatDatasource extends FormQueryDatasource<FormSpaceEditorFormatWrapper> {

    constructor(
        private formsService: CeFormsService
    ) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstanceExt>> {
        return this.formsService.getRawFormsQuery(query);
    }

    protected wrap(form: FormInstanceExt): FormSpaceEditorFormatWrapper {
        return new FormSpaceEditorFormatWrapper(form);
    }


}