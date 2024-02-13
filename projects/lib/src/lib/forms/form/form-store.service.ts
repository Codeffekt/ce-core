import { Injectable, Type } from "@angular/core";
import { FormFactoryComponents, FormFactoryOptions } from "./form-models";
import { FormInstance } from "@codeffekt/ce-core-data";

@Injectable({ providedIn: 'root'})
export class CeFormStoreService {

    private defaultComponent: Type<any>;

    private store: FormFactoryOptions = {
        components: {}
    };    

    getComponentType(type: string): Type<any> {
        const existingComponent = this.store.components[type];
        return existingComponent ?? this.defaultComponent;        
    }

    getComponenTypeFromForm(form: FormInstance): Type<any> {
        const existingComponent = this.store.components[form.root] ?? this.store.components[form.type];
        return existingComponent ?? this.defaultComponent;
    }

    setComponents(components: FormFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

    setDefaultComponent(component: Type<any>) {
        this.defaultComponent = component;
    }

}