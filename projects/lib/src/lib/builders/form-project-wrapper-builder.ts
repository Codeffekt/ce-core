/* import {
    FormInstanceBase, FormWrapper,
    Project, Utils, FormProjectWrapper, FormProject, FormInstance
} from "@codeffekt/ce-core-data";

export const PROJECT_FORM: Omit<FormInstanceBase, "id" | "ctime"> = {
    title: "Données du projet",
    content: {
        name: {
            type: "text",
            field: "name",
            label: "Nom du projet"
        }
    }
};

export class FormProjectWrapperBuilder {       

    static fromProject(project: Project): FormProjectWrapper {

        const formInstance: FormInstance = {
            ...Utils.deepcopy(PROJECT_FORM),
            root: FormProject.ROOT,
            valid: true,
            id: project.id,
            ctime: project.ctime,
            mtime: project.mtime
        };

        FormWrapper.setFormValue('name', project.name, formInstance);

        const assocs = project.forms;

        if (assocs?.length) {
            for (const assoc of assocs) {
                formInstance.content[assoc.id] = {
                    root: assoc.root,
                    type: "formArray",
                    field: assoc.id,
                    label: assoc.id,
                    value: [],
                    params: {
                        ref: assoc.ref,
                        fields: (<any>assoc).fields || [
                        ],
                        extMode: (<any>assoc).extMode ? true : false,
                        scope: "global"
                    }
                };
            }
        }

        return new FormWrapper(FormWrapper.createProps(formInstance), formInstance);
    }   
} */