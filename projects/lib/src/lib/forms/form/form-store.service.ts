/* import { Injectable, Type } from "@angular/core";
import {
    FormFactoryComponents, FormFactoryDeleteFunction,
    FormFactoryDeleteFunctions, FormFactoryOptions
} from "./form-models";
import { FormInstance, FormInstanceBase } from "@codeffekt/ce-core-data";

@Injectable({ providedIn: 'root' })
export class CeFormStoreService {

    private defaultRenderer: Type<any>;
    private defaultBuilder: Type<any>;
    private defaultDeleter: FormFactoryDeleteFunction;

    private components: FormFactoryOptions = {
        renderers: {},
        deleters: {},
        builders: {},
    };

    getRenderer(type: string): Type<any> {
        const existingComponent = this.components.renderers[type];
        return existingComponent ?? this.defaultRenderer;
    }

    getRendererFromForm(form: FormInstance): Type<any> {
        const existingComponent = this.components.renderers[form.root] ?? this.components.renderers[form.type];
        return existingComponent ?? this.defaultRenderer;
    }

    getBuilderFromForm(form: FormInstanceBase): Type<any> {
        const existingComponent = this.components.builders[form.id] ?? this.components.builders[form.type];
        return existingComponent ?? this.defaultBuilder;
    }

    getDeleterFromForm(form: FormInstance): FormFactoryDeleteFunction {
        const existingFunction = this.components.deleters[form.id] ?? this.components.deleters[form.type];
        return existingFunction ?? this.defaultDeleter;
    }

    setRenderers(components: FormFactoryComponents) {
        Object.keys(components).forEach(type => this.components.renderers[type] = components[type]);
    }

    setBuilders(components: FormFactoryComponents) {
        Object.keys(components).forEach(type => this.components.builders[type] = components[type]);
    }

    setDeleters(functions: FormFactoryDeleteFunctions) {
        Object.keys(functions).forEach(type => this.components.deleters[type] = functions[type]);
    }

    setDefaultRenderer(component: Type<any>) {
        this.defaultRenderer = component;
    }

    setDefaultBuilder(component: Type<any>) {
        this.defaultBuilder = component;
    }

    setDefaultDeleter(func: FormFactoryDeleteFunction) {
        this.defaultDeleter = func;
    }
} */