import { Injectable } from "@angular/core";
import {
    FormInstanceMaskWrapper,
    FormWrapper, IndexType
} from "@codeffekt/ce-core-data";
import { firstValueFrom } from "rxjs";
import { FormMaskBuilder } from "../forms/form/form-mask.builder";
import { FormWrapperChangeNotifier } from "../models";
import { FormInfo } from "../models/form-info";
import { CeAppService } from "./ce-app.service";
import { CeCoreService } from "./ce-core.service";
import { CeProjectsService } from "./ce-projects.service";

@Injectable({ providedIn: 'root' })
export class CeFormInfosService {

    // private formInfos: FormInfo[] = [];

    constructor(
        private projectService: CeProjectsService,
        private apiService: CeCoreService,
        private appService: CeAppService,
    ) { }


    async getFormInfo(formId: IndexType, options: { forceReload: boolean } = { forceReload: false }) {

        const pid = this.projectService.getCurrentProjectId();

        if (formId === pid && !options.forceReload) {
            return this.getFormInfoFromCurrentProject();
        }

        const form = FormWrapper.fromForm(await firstValueFrom(this.apiService.callFormQuery(
            pid,
            formId, {
            extMode: true,
            limit: 1
        })));

        const formMask = this.appService.getMask(form.core.root);
        const formMasked = formMask ? this.getFormMasked(form, formMask) : form;

        const formInfo: FormInfo = {
            form,
            formMask,
            formMasked,
        };

        // this.storeFormInfo(formInfo);

        return formInfo;
    }

    updateFormsFromChanges(changes: FormWrapperChangeNotifier[]) {
        /* for (const change of changes) {
            for (const formInfo of this.formInfos) {
                this.updateFormInfoFromChange(formInfo, change);
            }
        } */
    }

    /* private updateFormInfoFromChange(info: FormInfo, change: FormWrapperChangeNotifier) {

        const formInstanceExt = info.form?.core as FormInstanceExt;

        if (!formInstanceExt?.fields) {
            return;
        }        

        const fields = Object.keys(formInstanceExt.fields);

        for (const field of fields) {
            const formId = (<FormInstance> formInstanceExt.fields[field])?.id;
            if (formId === change.wrapper.core.id) {
                formInstanceExt.fields[field] = change.wrapper.core;
            }
        }
    } */

    private getFormInfoFromCurrentProject() {
        const formInfo: FormInfo = {
            form: this.projectService.getCurrentProject(),
            formMask: this.projectService.getCurrentProjectMask(),
            formMasked: this.projectService.getCurrentProjectFormMasked(),
        };

        // this.storeFormInfo(formInfo);

        return formInfo;
    }

    private getFormMasked(form: FormWrapper, formMask: FormInstanceMaskWrapper): FormWrapper {
        const formInstanceMasked = new FormMaskBuilder()
            .build(form.core, formMask);
        return FormWrapper.fromForm(formInstanceMasked);
    }

    /* private storeFormInfo(formInfo: FormInfo) {
        const existingIdx = this.formInfos.findIndex((elt) => elt.form.core.id === formInfo.form.core.id);
        if(existingIdx !== -1) {
            this.formInfos[existingIdx] = formInfo;            
        } else {
            this.formInfos.push(formInfo);
        }        
    } */
}