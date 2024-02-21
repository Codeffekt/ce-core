import { Component, ComponentRef, Input, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { FormRoot } from "@codeffekt/ce-core-data";
import { IFormNewContent } from "../form-models";
import { FormActionService } from "../actions/form-action.service";

@Component({
    selector: 'ce-form-new-factory',
    templateUrl: './form-new-factory.component.html',
    styleUrls: ['./form-new-factory.component.scss'],
})
export class FormNewFactoryComponent {

    _formRoot: FormRoot;
    get formRoot(): FormRoot {
        return this._formRoot;
    }

    @Input() set formRoot(value: FormRoot) {
        this._formRoot = value;
        this.updateComponent();
    }

    @ViewChild('container', { read: ViewContainerRef }) vcr: ViewContainerRef;

    private formComponent: ComponentRef<IFormNewContent>;
    private lastComponentType: Type<any>;

    constructor(        
        private formActionService: FormActionService,
    ) { }

    ngAfterViewInit(): void {
        this.updateComponent();
    }

    private updateComponent() {

        if (!this.vcr) {
            return;
        }

        if (!this.formComponent) {
            this.createComponent(this.formRoot);
        } else if (this.lastComponentType !== this.formComponent.componentType) {
            this.recreateComponent(this.formRoot);
        } else {
            this.connectInputs(this.formComponent.instance);
            this.formComponent.changeDetectorRef.detectChanges();
        }
    }

    private recreateComponent(formRoot: FormRoot) {

        if (!this.vcr) {
            return;
        }

        this.vcr.remove();
        this.createComponent(formRoot);
    }

    private createComponent(formRoot: FormRoot) {

        if (!this.vcr) {
            return;
        }

        const componentType = this.formActionService.getBuilderFromRoot(formRoot);
        if (componentType) {
            this.formComponent = this.vcr.createComponent(componentType);
        }
        this.lastComponentType = componentType;
        this.connectInputs(this.formComponent.instance);        
        this.formComponent.changeDetectorRef.detectChanges();
    }

    private connectInputs(component: IFormNewContent) {
        component.root = this.formRoot;        
    }   
}