import { FormWrapper } from "@codeffekt/ce-core-data";

export interface FormWrapperFieldsNeedsUpdate<T> {
    [prop:string]: boolean;
}

export interface FormWrapperChangeNotifier<T = FormWrapper> {
    wrapper: T;
    needsUpdate: FormWrapperFieldsNeedsUpdate<T>;
    needsAllUpdate?: boolean;
}

export class FormWrapperChangeUtils {

    static fromNew<T>(wrapper: T): FormWrapperChangeNotifier<T> {
        return {
            wrapper,
            needsUpdate: {},
            needsAllUpdate: true
        };
    }

    static withNoChange<T>(wrapper: T): FormWrapperChangeNotifier<T> {
        return {
            wrapper,
            needsUpdate: {},
            needsAllUpdate: false
        };
    }

    static withChanges<T>(
        wrapper: T, 
        changes: FormWrapperFieldsNeedsUpdate<T>): FormWrapperChangeNotifier<T> {
        return {
            wrapper,
            needsUpdate: changes,
            needsAllUpdate: false
        };
    }

}