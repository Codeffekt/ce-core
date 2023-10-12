import { Injectable } from "@angular/core";
import { FormBlock, FormInstance, FormWrapper } from "@codeffekt/ce-core-data";
import { FormWrapperChangeNotifier, FormWrapperChangeUtils } from "../models/FormWrapperChangeNotifier";
import { CeFormsService } from "../services/ce-forms.service";
import { ICeFormUpdaterService } from "./form-updater.service";

@Injectable({
    providedIn: 'root'
})
export class CeFormAccountUpdaterService implements ICeFormUpdaterService {

    constructor(
        protected readonly formsService: CeFormsService,
    ) {
    }

    async updateForm(form: FormWrapper): Promise<FormWrapperChangeNotifier[]> {
        const res = await this.formsService.rawFormMutation(
            {
                type: "form",
                op: "update",
                elts: [form.core as FormInstance]
            }
        );
        form.mergeForm(res);
        return [
            FormWrapperChangeUtils.fromNew(form)
        ];
    }

    async updateSubForm(form: FormWrapper, parent: FormWrapper, block: FormBlock): Promise<FormWrapperChangeNotifier[]> {
        return [
            ...await this.updateForm(form),
            ...await this.updateForm(parent)
        ];
    }

}