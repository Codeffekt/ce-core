import { Injectable, Type } from "@angular/core";
import { ProjectAssocFactoryOptions, ProjectAssocFactoryComponents } from "./project-assoc-models";

@Injectable({ providedIn: 'root'})
export class ProjectAssocStoreService {

    private defaultComponent!: Type<any>;

    private store: ProjectAssocFactoryOptions = {
        components: {}
    };    

    getComponentType(type: string): Type<any> {
        const existingComponent = this.store.components[type];
        return existingComponent ?? this.defaultComponent;        
    }

    setComponents(components: ProjectAssocFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }

    setDefaultComponent(component: Type<any>) {
        this.defaultComponent = component;
    }

}