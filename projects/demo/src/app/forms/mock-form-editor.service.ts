import { Injectable } from "@angular/core";
import { FormEditorServiceBase, FormInfo } from "@codeffekt/ce-core";
import { FormInstanceMaskWrapper, FormWrapper, IndexType } from "@codeffekt/ce-core-data";
import { MockApiService } from "../api/mock-api.service";

@Injectable({
    providedIn: 'root'
})
export class MockFormEditorService extends FormEditorServiceBase {

    constructor(private readonly mockApiService: MockApiService) {
        super(null);
    }

    async getForm(id: IndexType): Promise<FormInfo> {
        const form = await this.mockApiService.getFormById(id);
        const formMask = await this.mockApiService.getFormMaskById(id);
        const formStyle = await this.mockApiService.getFormStyleById(id);

        const formInfo: FormInfo = {
            form: new FormWrapper(FormWrapper.createProps(form), form),
            formMask: new FormInstanceMaskWrapper(formMask),
        };

        this.setCurrentFormInfo(formInfo);

        return formInfo;
    }    
}