import { EventEmitter, Type } from "@angular/core";
import {
    FormInstanceMaskWrapper, FormRoot,
    FormWrapper
} from "@codeffekt/ce-core-data";

export interface IFormContent {
    formWrapper: FormWrapper;
    formMask: FormInstanceMaskWrapper | undefined;
    rebuildOnChanges: boolean;
    formChanges: EventEmitter<FormWrapper>;
}

export interface IFormNewContent {
    root: FormRoot;
}

export interface FormFactoryComponents {
    [type: string]: Type<any>;
}

export type FormFactoryDeleteFunction = (id: any) => Promise<void>;

export interface FormFactoryDeleteFunctions {
    [type: string]: FormFactoryDeleteFunction;
}

export interface FormFactoryOptions {
    renderers: FormFactoryComponents;
    deleters: FormFactoryDeleteFunctions;
    builders: FormFactoryComponents;
}
