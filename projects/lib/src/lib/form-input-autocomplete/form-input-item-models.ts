import { EventEmitter, Type } from "@angular/core";
import { FormBlock } from "@codeffekt/ce-core-data";

export interface IFormAutocompleteItemContent<T = any> {
    itemChangedEvent?: EventEmitter<boolean>;
    item: T;
    block?: FormBlock;
}
export interface FormAutocompleteItemFactoryComponents {
    [type: string]: Type<any>;
}

export interface FormAutocompleteItemFactoryOptions {
    components: FormAutocompleteItemFactoryComponents;
}
