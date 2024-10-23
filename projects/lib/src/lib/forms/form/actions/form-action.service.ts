import { Injectable, inject } from "@angular/core";
import { FormInstance, FormRoot } from "@codeffekt/ce-core-data";
import { FormAction, FormActions } from "./form-action";
import { FormActionDefault } from "./form-action-default";

@Injectable({ providedIn: 'root'})
export class FormActionService {

    private actions: FormActions = {};
    private defaultAction: FormAction = inject(FormActionDefault);

    constructor() {}

    setDefaultAction(action: FormAction) {
        this.defaultAction = action;
    }

    getActionFromForm(form: FormInstance): FormAction {
        const existingAction = this.actions[form.root] ?? this.actions[form.type!];
        return existingAction ?? this.defaultAction;
    }

    getActionFromRoot(root: FormRoot): FormAction {
        const existingAction = this.actions[root.id] ?? this.actions[root.type!];
        return existingAction ?? this.defaultAction;
    }

    setActions(actions: FormActions) {
        Object.keys(actions).forEach(type => this.actions[type] = actions[type]);
    }

    getRenderFromForm(form: FormInstance) {
        const action = this.getActionFromForm(form);
        return action?.render() ?? this.defaultAction?.render();
    }

    getRenderFromRoot(root: FormRoot) {
        const action = this.getActionFromRoot(root);
        return action?.render() ?? this.defaultAction?.render();
    }

    getBuilderFromRoot(root: FormRoot) {
        const action = this.getActionFromRoot(root);
        return action?.builder() ?? this.defaultAction?.builder();
    }

    getMenuFromForm(form: FormInstance) {
        const action = this.getActionFromForm(form);
        return action?.menu() ?? this.defaultAction?.menu();
    }

    getTopbarFromForm(form: FormInstance) {
        const action = this.getActionFromForm(form);
        return action?.topbar() ?? this.defaultAction?.topbar();
    }

    getToolbarFromForm(form: FormInstance) {
        const action = this.getActionFromForm(form);
        return action?.toolbar() ?? this.defaultAction?.toolbar();
    }
}