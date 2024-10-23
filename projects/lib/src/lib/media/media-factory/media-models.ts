import { EventEmitter, Type } from "@angular/core";
import { AssetElt } from "@codeffekt/ce-core-data";

export interface IMediaContent {
    mode: 'view' | 'edit';
    enableLink: boolean;
    elt: AssetElt;
    delete: EventEmitter<AssetElt>;
}

export type MediaFactoryFunction = (f: string) => Type<any>;

export interface MediaFactoryComponentClass {
    useClass: Type<any>;
}

export interface MediaFactoryComponentFunction {
    useFunction: MediaFactoryFunction;
}
export interface MediaFactoryComponents {
    [type: string]: MediaFactoryComponentClass | MediaFactoryComponentFunction;
}

export interface MediaFactoryOptions {
    components: MediaFactoryComponents;
}

export type MediaToTypeFunc = (a: AssetElt) => string|undefined;
