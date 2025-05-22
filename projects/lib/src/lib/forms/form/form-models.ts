import { EventEmitter, Type } from "@angular/core";
import {
    FormInstanceMaskWrapper, 
    FormRoot, 
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

export interface FormFactoryOptions {
    components: FormFactoryComponents;
}
