import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormInstance, FormUtils, FormWrapper } from "@codeffekt/ce-core-data";
import { CeProjectsService } from "../services/ce-projects.service";

interface LabelFromDataFormConfig {
    dataFormName: string;
    field: string;
}

@Injectable({ providedIn: 'root' })
export class CeBreadcrumbLabelResolver {

    constructor(private projectService: CeProjectsService) { }

    resolve(activatedRoute: ActivatedRoute, updatedForm?: FormInstance): string {

        const data = activatedRoute.snapshot.data;

        if (!data.routeId) {
            return undefined;
        }

        if (data.labelFromData) {
            return this.getLabelFromData(data, data.labelFromData);
        }

        const wrapper = data.form?.formMasked as FormWrapper;

        if (wrapper) {

            if (wrapper.core.id === updatedForm?.id) {
                return FormUtils.getFormTitle(updatedForm);
            } else {
                return wrapper.getFormTitle();
            }
        }

        const projectForm = this.projectService.getCurrentProjectFormMasked()?.core as FormInstance;

        if (projectForm) {
            const blockId = data.useParams ? activatedRoute.snapshot.paramMap.get(data.routeId) : data.routeId;
            const projectBlock = FormUtils.getBlockFromField(projectForm, blockId);
            if (projectBlock) {
                return projectBlock.label;
            }
        }

        return data.routeId;
    }

    private getLabelFromData(data: any, config: LabelFromDataFormConfig) {
        if (config.field.startsWith('$')) {
            return data[config.dataFormName][config.field.slice(1)];
        } else {
            return FormWrapper.getFormValue(config.field, data[config.dataFormName]);
        }
    }
}