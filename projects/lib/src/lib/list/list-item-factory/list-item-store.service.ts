import { Injectable, Type } from "@angular/core";
import { ListItemFactoryComponents, ListItemFactoryOptions } from "./list-item-models";

@Injectable({ providedIn: 'root' })
export class ListItemStoreService {

    private defaultComponent: Type<any>;

    private store: ListItemFactoryOptions = {
        components: {}
    };    

    getComponentType(type: string): Type<any> {
        const existingComponent = this.store.components[type];
        return existingComponent ?? this.defaultComponent;        
    }

    setComponents(components: ListItemFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

    setDefaultComponent(component: Type<any>) {
        this.defaultComponent = component;
    }
}