import { Injectable } from "@angular/core";
import { DbArrayRes, FormInstanceExt, FormWrapper, IndexType } from "@codeffekt/ce-core-data";
import { CeFormsService } from "./ce-forms.service";
import { CeAppService } from "./ce-app.service";
import { FormEditorServiceBase } from "./ce-form-editor.service";
import { firstValueFrom } from "rxjs";
import { FormInfo } from "../models/form-info";

@Injectable({
    providedIn: 'root'
})
export class CeFormAccountEditorService extends FormEditorServiceBase {

    constructor(
        private formsService: CeFormsService,
        appService: CeAppService,
    ) {
        super(appService);
    }

    async getForm(id: IndexType): Promise<FormInfo> {
        if (this.formInfo?.form.core.id === id) {
            return this.formInfo;
        }

        const res: DbArrayRes<FormInstanceExt> = await firstValueFrom(this.formsService.getRawFormsQuery({
            limit: 1,
            queryFields: [{
                field: "id",
                op: "=",
                value: id,
                onMeta: true
            }],
            extMode: true
        }));

        if (!res.elts.length) {
            throw new Error(`Form ${id} not found`);
        }

        const form = res.elts[0];

        const formMask = this.appService.getMask(form.root);

        const formInfo: FormInfo = {
            form: new FormWrapper(FormWrapper.createProps(form), form),
            formMask,
        };

        this.setCurrentFormInfo(formInfo);

        return formInfo;
    }
}
