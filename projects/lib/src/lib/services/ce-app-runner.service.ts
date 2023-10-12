import { Injectable } from "@angular/core";

import {
    DbArrayRes,
    EltNotFoundError, FormAppWrapper, FormBlock,
    FormInstance, FormInstanceExt,
    FormInstanceMaskWrapper,
    FormProjectWrapper,
    FormUtils, FormWrapper,
    IndexType
} from "@codeffekt/ce-core-data";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { FormQueryAssocBuilder } from "../forms/forms-query/formquery-assoc.builder";
import { FormInfo } from "../models/form-info";
import { CeAccountService } from "./ce-account.service";
import { CeAppService } from "./ce-app.service";
import { CeFormEditorService } from "./ce-form-editor.service";
import { CeFormsService } from "./ce-forms.service";
import { CeProjectsService } from "./ce-projects.service";

@Injectable({
    providedIn: 'root'
})
export class CeAppRunnerService {

    private currentApp: FormAppWrapper | undefined;
    private masks: FormInstanceMaskWrapper[] = [];
    private currentProjects: FormProjectWrapper[] = [];    
    private currentAssoc: FormBlock | undefined;
    private currentForm: FormInstanceExt | undefined;
    private currentSubForm: FormInstance | undefined;

    assoc$ = new BehaviorSubject<FormBlock | undefined>(undefined);
    form$ = new BehaviorSubject<FormInstanceExt | undefined>(undefined);
    subForm$ = new BehaviorSubject<FormInstance | undefined>(undefined);

    constructor(
        private readonly formsService: CeFormsService,
        private readonly accountService: CeAccountService,
        private readonly projectsService: CeProjectsService,
        private readonly formEditorService: CeFormEditorService,
        private readonly appService: CeAppService,
    ) { }

    async fetchCurrentApp(id: IndexType): Promise<void> {

        this.clearCurrentApp();

        const form = await this.formsService.getForm(id);

        if (!form) {
            throw new EltNotFoundError(`Application ${id} not found`, { id });
        }

        this.currentApp = FormWrapper.fromForm(form);

        this.appService.setConfig({
            ...this.appService.getConfig(),
            configType: this.currentApp.props.category,
            title: this.currentApp.props.title,
            projectType: this.currentApp.props.type,
        });
    }

    async fetchAppConfig() {
        if (!this.currentApp) {
            throw new Error("No current app");
        }

        await this.loadConfigFromApp();
    }

    async fetchAppProjects(): Promise<FormProjectWrapper[]> {

        if (!this.currentApp) {
            throw new Error("No current app");
        }

        this.clearCurrentProjects();

        // this.currentProjects = await firstValueFrom(this.accountService.getProjects(this.currentApp.props.type));

        throw new Error(`Must be updated to form projects`);

        this.currentProjects = [];

        return this.currentProjects;
    }

    async fetchAppProject(id: IndexType): Promise<FormInfo> {        

        this.clearCurrentProject();

        const project = await this.projectsService.getProject(id);

        if (!project) {
            throw new EltNotFoundError(`Project ${id} not found`, { id });
        }

        await this.appService.loadConfigFromProject(project);  

        this.projectsService.setCurrentProject(project);                      

        const form = this.projectsService.getCurrentProject();
        const formMask = this.projectsService.getCurrentProjectMask();

        const formInfo: FormInfo = {
            form,
            formMask,
            isProject: true
        };

        this.formEditorService.setCurrentFormInfo(formInfo);

        return formInfo;
    }

    async fetchProjectAssoc(id: IndexType): Promise<FormBlock> {

        const currentProject = this.projectsService.getCurrentProject();

        if (!currentProject) {
            throw new Error("No current project");
        }

        this.clearCurrentAssoc();

        this.currentAssoc = FormUtils.getBlocks(currentProject.core as FormInstance)
            .find(block => block.field === id && block.type === "formArray");

        if (!this.currentAssoc) {
            throw new EltNotFoundError(`Forms ${id} not found`, { id });
        }

        this.assoc$.next(this.currentAssoc);

        return this.currentAssoc;
    }

    async fetchProjectForm(id: IndexType): Promise<FormInstanceExt> {

        const currentProject = this.projectsService.getCurrentProject();

        if (!currentProject) {
            throw new Error("No current project");
        }

        if (!this.currentAssoc) {
            throw new Error("No current assoc");
        }

        this.clearCurrentForm();

        const formInfo = await this.formEditorService.getForm(id);

        /* const form = await this.formsService.getFormQuery(
            this.currentProject?.id,
            id,
            this.currentAssoc.id,
            {
                extMode: true
            }
        ); */

        if (!formInfo?.form) {
            throw new EltNotFoundError(`Form ${id} not found`, { id });
        }

        this.currentForm = formInfo.form.core as FormInstanceExt;

        this.form$.next(this.currentForm);

        return this.currentForm;
    }

    async fetchProjectFormAssoc(assocId: IndexType): Promise<FormInfo> {

        const assoc = await this.fetchProjectAssoc(assocId);
        const project = this.getCurrentProject();

        const formMask = this.getCurrentProjectMask();

        const form: FormInstance = {
            ...project.core,
            title: assoc.label,        
            content: {
              [assoc.field]: {
                ...assoc,
              }
            }
          };

        const formInfo: FormInfo = {
            form: FormWrapper.fromForm(form),
            formMask,
        };

        this.formEditorService.setCurrentFormInfo(formInfo);

        return formInfo;
    }

    async fetchSubForm(field: IndexType): Promise<FormInstance> {

        if (!this.currentForm) {
            throw new Error("No current form");
        }

        this.clearCurrentSubForm();

        const subForm = FormUtils.getFormField(field, this.currentForm);

        if (!subForm) {
            throw new Error(`Field ${field} not found`);
        }

        this.currentSubForm = subForm;

        this.subForm$.next(this.currentSubForm);

        return this.currentSubForm;
    }

    getCurrentApp(): FormAppWrapper | undefined {
        return this.currentApp;
    }

    getCurrentProjects(): FormProjectWrapper[] {
        return this.currentProjects;
    }

    getCurrentProject(): FormProjectWrapper | undefined {
        return this.projectsService.getCurrentProject();
    }

    getCurrentProjectMask(): FormInstanceMaskWrapper | undefined {
        return this.appService.getMasks()
            .find(mask => mask.props.root === 'forms-project');
    }

    getCurrentAssoc(): FormBlock | undefined {
        return this.currentAssoc;
    }

    getCurrentForm(): FormInstanceExt | undefined {
        return this.currentForm;
    }

    getCurrentSubForm(): FormInstance | undefined {
        return this.currentSubForm;
    }

    getMask(root: string) {
        return this.masks.find(mask => mask.props.root === root);
    }

    getMasks() {
        return this.masks;
    }

    private async loadConfigFromApp() {
        this.clearConfig();
        await this.loadMasks();
    }

    private async loadMasks() {
        const block = FormUtils.getBlockFromField(this.currentApp!.core, "masks")
        if (!block) {
            return;
        }
        const res = await this.getFormsFromTable(block);
        this.masks = res.elts.map(form => new FormInstanceMaskWrapper(form));
    }

    private getFormsFromTable(block: FormBlock): Promise<DbArrayRes<FormInstance>> {
        const builder = new FormQueryAssocBuilder();
        const appForm = this.currentApp!.core;
        builder.setAssoc(block, appForm);
        return this.formsService.getRawFormsQuery(builder.create()).toPromise();
    }

    private clearConfig() {
        this.masks = [];
    }

    private clearCurrentApp() {
        this.currentApp = undefined;
        this.clearCurrentProjects();
    }

    private clearCurrentProjects() {
        this.currentProjects = [];
        this.clearCurrentProject();
    }

    private clearCurrentProject() {        
        this.clearCurrentAssoc();
    }

    private clearCurrentAssoc() {
        this.currentAssoc = undefined;
        this.clearCurrentForm();
    }

    private clearCurrentForm() {
        this.currentForm = undefined;
        this.clearCurrentSubForm();
    }

    private clearCurrentSubForm() {
        this.currentSubForm = undefined;
    }
}