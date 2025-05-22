import { Injectable, Type } from "@angular/core";
import { FormInstance } from "@codeffekt/ce-core-data";
import { FormFactoryComponents, FormFactoryOptions } from "./form-models";

@Injectable({ providedIn: 'root'})
export class FormStoreService {
    private defaultComponent!: Type<any>;

    private store: FormFactoryOptions = {
        components: {}
    };    

    getComponentType(type: string): Type<any> {
        const existingComponent = this.store.components[type];
        return existingComponent ?? this.defaultComponent;        
    }

    getComponentTypeFromForm<T=any>(form: FormInstance): Type<T> {
        const root = form.cat ?? form.root;
        const existingComponent = this.store.components[form.root];
        return existingComponent ?? this.defaultComponent;
    }

    setComponents(components: FormFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

    setDefaultComponent(component: Type<any>) {
        this.defaultComponent = component;
    }
}