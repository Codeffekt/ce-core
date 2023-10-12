import { EventEmitter, Type } from "@angular/core";
import { FormBlock } from "@codeffekt/ce-core-data";

export interface IListItemContent<T = any> {
    itemChangedEvent?: EventEmitter<boolean>;
    item: T;
    block?: FormBlock;
  }
export interface ListItemFactoryComponents {
    [type: string]: Type<any>;
}

export interface ListItemFactoryOptions {
    components: ListItemFactoryComponents;
}
