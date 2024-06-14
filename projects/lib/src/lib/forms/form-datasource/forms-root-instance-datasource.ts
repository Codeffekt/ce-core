import { Observable, map } from "rxjs";
import { FormQuery, DbArrayRes, FormRoot, FormInstance } from "@codeffekt/ce-core-data";
import { FormQueryDatasource } from "./form-query.datasource";
import { CeFormsService } from "../../services/ce-forms.service";

export class FormsRootInstanceDataSource extends FormQueryDatasource {
    constructor(
        private formsService: CeFormsService
    ) {
        super();
    }

    protected queryDb(query: FormQuery): Observable<DbArrayRes<FormInstance>> {
        return this.formsService.getRawFormsRootQuery(query).pipe(
            map(res => ({
                ...res,
                elts: this.convertRootsToInstances(res.elts)
            })
        ));
    }

    protected wrap(form: FormInstance): FormInstance {
        return form;
    }    

    private convertRootsToInstances(forms: FormRoot[]): FormInstance[] {
        return forms.map(form => this.convertRootToInstance(form));
    }

    private convertRootToInstance(form: FormRoot): FormInstance {
        return {
            root: form.id,
            valid: true,
            ...form
        };
    }
}