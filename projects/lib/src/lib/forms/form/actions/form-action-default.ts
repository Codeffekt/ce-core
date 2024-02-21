import { Injectable, Type } from "@angular/core";
import { FormAction } from "./form-action";
import { CeFormComponent } from "../form.component";
import { CeFormsService } from "../../../services/ce-forms.service";
import { FormInstance, IndexType } from "@codeffekt/ce-core-data";
import { FormNewComponent } from "../form-new/form-new.component";

@Injectable({ providedIn: 'root' })
export class FormActionDefault implements FormAction {

    constructor(
        private formsService: CeFormsService,
    ) {
    }

    async update(form: FormInstance): Promise<void> {
        await this.formsService.updateForm(form); 
    }

    async upgrade(form: FormInstance): Promise<void> {
        await this.formsService.formUpgrade(form.root, [form.id]);
    }

    create(root: IndexType, partialContent?: Partial<any>): Promise<FormInstance> {
        return this.formsService.createForm(root, partialContent);
    }

    async delete(form: FormInstance): Promise<void> {
        await this.formsService.deleteForm(form.id);
    }

    copy(): void {
        throw new Error("Method not implemented.");
    }

    render(): Type<any> {
        return CeFormComponent;
    }

    builder(): Type<any> {
        return FormNewComponent;
    }
}