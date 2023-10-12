import { Injectable, Type } from "@angular/core";
import { FormAutocompleteItemFactoryOptions } from "./form-input-item-models";
import { FormAutocompleteItemFactoryComponents } from "./form-input-item-models";

@Injectable({ providedIn: 'root' })
export class CeFormInputAutocompleteStoreService {

    private defaultComponent?: Type<any>;

    private store: FormAutocompleteItemFactoryOptions = {
        components: {}
    };

    getComponentType(type: string): Type<any> {
        const existingComponent = this.store.components[type];
        return existingComponent ?? this.defaultComponent;
    }

    setComponents(components: FormAutocompleteItemFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

    setDefaultComponent(component: Type<any>) {
        this.defaultComponent = component;
    }
}