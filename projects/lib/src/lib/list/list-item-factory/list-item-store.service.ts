import { Injectable, Type } from "@angular/core";
import {
    ListItemFactoryComponentClass, ListItemFactoryComponentFunction,
    ListItemFactoryComponents, ListItemFactoryOptions
} from "./list-item-models";

function isFactoryFunction(elt: ListItemFactoryComponentClass | ListItemFactoryComponentFunction): elt is ListItemFactoryComponentFunction {
    return (<ListItemFactoryComponentFunction>elt)?.useFunction !== undefined;
}
@Injectable({ providedIn: 'root' })
export class ListItemStoreService {

    private defaultComponent!: Type<any>;

    private store: ListItemFactoryOptions = {
        components: {}
    };

    getComponentType<T>(type: string, elseUseDefault = true): Type<any>|undefined {
        const existingComponent = this.store.components[type];

        if (!existingComponent) {
            return elseUseDefault ? this.defaultComponent : undefined;
        }

        return isFactoryFunction(existingComponent) ? existingComponent.useFunction(type) : existingComponent.useClass;
    }

    setComponents(components: ListItemFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

    setDefaultComponent(component: Type<any>) {
        this.defaultComponent = component;
    }
}