import { Injectable } from "@angular/core";
import { FormBlock, FormWrapper } from "@codeffekt/ce-core-data";
import { CeProjectsService } from "../services/ce-projects.service";
import { CeCoreService } from "../services/ce-core.service";
import { firstValueFrom } from "rxjs";
import { FormWrapperChangeNotifier, FormWrapperChangeUtils } from "../models/FormWrapperChangeNotifier";

export interface ICeFormUpdaterService {
    updateForm(form: FormWrapper): Promise<FormWrapperChangeNotifier[]>;
    updateSubForm(form: FormWrapper, parent: FormWrapper, block: FormBlock): Promise<FormWrapperChangeNotifier[]>
}

@Injectable({
    providedIn: 'root'
})
export class CeFormUpdaterService implements ICeFormUpdaterService {    

    constructor(
        protected readonly coreService: CeCoreService,
        readonly projectService: CeProjectsService
    ) {       
    }

    async updateForm(wrapper: FormWrapper): Promise<FormWrapperChangeNotifier[]> {
        const updatedForm = await firstValueFrom(this.coreService.callFormMutation(
            this.projectService.getCurrentProjectId(),
            {
                type: "form",
                op: "update",
                elts: [wrapper.core]
            }
        ));
        wrapper.mergeForm(updatedForm);
        return [
            FormWrapperChangeUtils.fromNew(wrapper)
        ];
    }

    async updateSubForm(form: FormWrapper, parent: FormWrapper, block: FormBlock): Promise<FormWrapperChangeNotifier[]> {
        return [
            ...await this.updateForm(form),
            ...await this.updateForm(parent)
        ];
    }

}