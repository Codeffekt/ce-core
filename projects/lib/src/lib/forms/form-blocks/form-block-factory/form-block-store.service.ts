import { Injectable } from "@angular/core";
import { FormBlock } from "@codeffekt/ce-core-data";
import { FormBlockComponentAccessor } from "../form-block/form-block.component";

export interface FormBlockComponentType<T> {
    new(...args: any[]): T;
}

export interface FormBlockFactoryComponents {
    [type: string]: FormBlockComponentType<FormBlockComponentAccessor<any>>;
}

export interface FormBlockFactoryOptions {
    components: FormBlockFactoryComponents;
}

@Injectable({ providedIn: 'root' })
export class FormBlockStoreService {

    private store: FormBlockFactoryOptions = {
        components: {}
    };

    getComponentType<T>(block: FormBlock): FormBlockComponentType<FormBlockComponentAccessor<T>> {
        return this.store.components[block.type];
    }

    setComponents(components: FormBlockFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

}