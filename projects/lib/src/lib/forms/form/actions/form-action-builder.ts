import { Type } from "@angular/core";
import { FormInstance, IndexType } from "@codeffekt/ce-core-data";
import { FormAction } from "./form-action";

export class FormActionBuilder implements FormAction {

    static withRender(component: Type<any>) {
        const builder = new FormActionBuilder();
        builder.setRender(component);
        return builder;
    }

    static withBuilder(component: Type<any>) {
        const builder = new FormActionBuilder();
        builder.setBuilder(component);
        return builder;
    }

    private renderComponent: Type<any>;
    private builderComponent: Type<any>;

    constructor() {
    }
    
    update(form: FormInstance): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    upgrade(form: FormInstance): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    create(root: IndexType, partialContent?: Partial<any>): Promise<FormInstance> {
        throw new Error("Method not implemented.");
    }
    
    delete(form: FormInstance): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    copy(): void {
        throw new Error("Method not implemented.");
    }
    
    render(): Type<any> {
        return this.renderComponent;
    }
    
    builder(): Type<any> {
        return this.builderComponent;
    }

    setRender(component: Type<any>) {
        this.renderComponent = component;
        return this;
    }

    setBuilder(component: Type<any>) {
        this.builderComponent = component;
        return this;
    }
}