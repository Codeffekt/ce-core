import { Injectable, Type } from "@angular/core";
import {
    MediaFactoryComponentClass, MediaFactoryComponentFunction,
    MediaFactoryComponents, MediaFactoryOptions
} from "./media-models";

function isFactoryFunction(elt: MediaFactoryComponentClass | MediaFactoryComponentFunction): elt is MediaFactoryComponentFunction {
    return (<MediaFactoryComponentFunction>elt)?.useFunction !== undefined;
}
@Injectable({ providedIn: 'root' })
export class MediaStoreService {

    private defaultComponent: Type<any>;

    private store: MediaFactoryOptions = {
        components: {}
    };

    getComponentType<T>(type: string, elseUseDefault = true): Type<any> {
        const existingComponent = this.store.components[type];

        if (!existingComponent) {
            return elseUseDefault ? this.defaultComponent : undefined;
        }

        return isFactoryFunction(existingComponent) ? existingComponent.useFunction(type) : existingComponent.useClass;
    }

    setComponents(components: MediaFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

    setDefaultComponent(component: Type<any>) {
        this.defaultComponent = component;
    }
}