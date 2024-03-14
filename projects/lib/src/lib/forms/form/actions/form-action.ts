import { Type } from "@angular/core";
import { FormInstance, IndexType } from "@codeffekt/ce-core-data";

export interface FormAction<T = any> {
    update(form: FormInstance): Promise<void>;
    upgrade(form: FormInstance): Promise<void>;
    create(root: IndexType, partialContent?: Partial<any>): Promise<FormInstance>;
    delete(form: FormInstance): Promise<void>;
    copy(): void;
    render(): Type<any>;
    builder(): Type<any>;
    menu(): Type<any>;
    topbar(): Type<any>;
    toolbar(): Type<any>;
}

export interface FormActions {
    [type: string]: FormAction
}
