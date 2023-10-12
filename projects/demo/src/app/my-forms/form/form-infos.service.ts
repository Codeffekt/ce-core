import { Injectable } from "@angular/core";
import { FormWrapper, IndexType } from "@codeffekt/ce-core-data";
import { CeFormsService, FormInfo } from "@codeffekt/ce-core";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FormInfosService {

    constructor(
        private formsService: CeFormsService
    ) { }

    async getFormInfo(formId: IndexType) {

        const res = await firstValueFrom(this.formsService.getRawFormsQuery({
            queryFields: [{
                field: "id",
                value: formId,
                op: "=",
                onMeta: true
            }],
            extMode: true,
            limit: 1,
            offset: 0
        }));

        if(!res.elts.length) {
            throw new Error(`Elt not found ${formId}`);
        }

        const form = FormWrapper.fromForm(res.elts[0]);

        const formInfo: FormInfo = {
            form,
            formMask: undefined,
            formMasked: form
        };

        return formInfo;
    }
}