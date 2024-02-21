import { Injectable } from "@angular/core";
import {
    FormInstance,
    FormInstanceMaskWrapper,
    IndexType
} from "@codeffekt/ce-core-data";
import { BehaviorSubject } from "rxjs";
import { FormInfo } from "../models/form-info";
import { CeAppService } from "./ce-app.service";
import { CeFormInfosService } from "./ce-form-infos.service";
import { CeProjectsService } from "./ce-projects.service";
import { FormAssocBuilder } from "../models/FormAssoc";
import { FormActionService } from "../forms/form/actions/form-action.service";

export abstract class FormEditorServiceBase {

    protected formInfo!: FormInfo;

    protected formInfo$: BehaviorSubject<FormInfo | undefined> = new BehaviorSubject(undefined);

    constructor(
        protected appService: CeAppService,
    ) { }


    abstract getForm(id: IndexType): Promise<FormInfo>;    

    setCurrentFormInfo(formInfo: FormInfo) {
        this.formInfo = formInfo;
        this.formInfo$.next(this.formInfo);
    }

    getCurrentFormInfo(): FormInfo {
        return this.formInfo;
    }

    onFormInfo() {
        return this.formInfo$;
    }   
}

@Injectable({ providedIn: 'root' })
export class CeFormEditorService extends FormEditorServiceBase {

    constructor(
        private formInfos: CeFormInfosService,
        private formActionService: FormActionService,
        private projectService: CeProjectsService,        
        appService: CeAppService,
    ) {
        super(appService);
    }

    async getForm(id: IndexType, options: { forceReload: boolean } = { forceReload: false }): Promise<FormInfo> {
        const formInfo = await this.formInfos.getFormInfo(id, options);
        this.setCurrentFormInfo(formInfo);
        return formInfo;
    }

    async getFormAssoc(assoc: IndexType): Promise<FormInfo> {
        const projectForm = this.projectService.getCurrentProjectFormMasked();        
        const onlyAssocForm = FormAssocBuilder.fromForm(projectForm.core, assoc);
        const formInfo: FormInfo = {
            form: onlyAssocForm,
            formMask: new FormInstanceMaskWrapper(),
            formMasked: onlyAssocForm,
            isProject: true
        };
        this.setCurrentFormInfo(formInfo);
        return formInfo;
    }

    async updateForm(form: FormInstance) {
        await this.formActionService.getActionFromForm(form).update(form);
        return this.getForm(form.id, { forceReload: true });
    }
}

