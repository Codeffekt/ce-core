import { EventEmitter, Injectable, Type } from "@angular/core";
import { NavigationItemDefaultComponent } from "../navigation-item-default/navigation-item-default.component";
import { FormWrapper } from "@codeffekt/ce-core-data";

export interface INavItemComponent<T = any> {
    itemChangedEvent?: EventEmitter<boolean>;
    items?: readonly T[];
    formWrapper?: FormWrapper;
}


export type NavItemFactoryFunction = (f: string) => Type<any>;

export interface NavItemFactoryComponentClass {
    useClass: Type<any>;
}

export interface NavItemFactoryComponentFunction {
    useFunction: NavItemFactoryFunction;
}
 
export interface NavItemFactoryComponents {
    [type: string]: NavItemFactoryComponentClass | NavItemFactoryComponentFunction;
}
export interface NavItemFactoryOptions {
    components: NavItemFactoryComponents;
}

function isFactoryFunction(elt: NavItemFactoryComponentClass | NavItemFactoryComponentFunction): elt is NavItemFactoryComponentFunction {
    return (<NavItemFactoryComponentFunction> elt)?.useFunction !== undefined;
}
@Injectable({ providedIn: 'root' })
export class NavigationItemStoreService {

    private store: NavItemFactoryOptions = {
        components: {}
    };

    getComponentType<T>(form: FormWrapper, elseUseDefault = true): Type<any> {
        const existingComponent = this.store.components[form.core.root]; 
        
        if(!existingComponent) {
            return elseUseDefault ? NavigationItemDefaultComponent : undefined as any;
        }

        return isFactoryFunction(existingComponent) ? existingComponent.useFunction(form as any) : existingComponent.useClass;
    }    

    setComponents(components: NavItemFactoryComponents) {
        Object.keys(components).forEach(type => this.store.components[type] = components[type]);
    }
}