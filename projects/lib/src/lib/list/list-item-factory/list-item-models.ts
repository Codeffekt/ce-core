import { EventEmitter, Type } from "@angular/core";
import { FormBlock } from "@codeffekt/ce-core-data";

export interface IListItemContent<T = any> {
    itemChangedEvent?: EventEmitter<boolean>;
    item: T;
    block?: FormBlock;
}

export type ListItemFactoryFunction = (FormWrapper) => Type<any>;

export interface ListItemFactoryComponentClass {
    useClass: Type<any>;
}

export interface ListItemFactoryComponentFunction {
    useFunction: ListItemFactoryFunction;
}
export interface ListItemFactoryComponents {
    [type: string]: ListItemFactoryComponentClass | ListItemFactoryComponentFunction;
}

export interface ListItemFactoryOptions {
    components: ListItemFactoryComponents;
}
