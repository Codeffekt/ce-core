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

    static withMenu(component: Type<any>) {
        const builder = new FormActionBuilder();
        builder.setMenu(component);
        return builder;
    }

    static withToolbar(component: Type<any>) {
        const builder = new FormActionBuilder();
        builder.setToolbar(component);
        return builder;
    }

    private renderComponent: Type<any>;
    private builderComponent: Type<any>;
    private menuComponent: Type<any>;
    private topbarComponent: Type<any>;
    private toolbarComponent: Type<any>;

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

    menu(): Type<any> {
        return this.menuComponent;
    }

    topbar(): Type<any> {
        return this.topbarComponent;
    }

    toolbar(): Type<any> {
        return this.toolbarComponent;
    }

    setRender(component: Type<any>) {
        this.renderComponent = component;
        return this;
    }

    setBuilder(component: Type<any>) {
        this.builderComponent = component;
        return this;
    }

    setMenu(component: Type<any>) {
        this.menuComponent = component;
        return this;
    }

    setTopbar(component: Type<any>) {
        this.topbarComponent = component;
        return this;
    }

    setToolbar(component: Type<any>) {
        this.toolbarComponent = component;
        return this;
    }
}