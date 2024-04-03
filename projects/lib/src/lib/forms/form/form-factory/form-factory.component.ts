import {
  AfterViewInit, Component,
  ComponentRef, EventEmitter,
  Input, OnInit,
  Output, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormInstance, FormInstanceMaskWrapper, FormWrapper } from '@codeffekt/ce-core-data';
import { Subscription } from 'rxjs';
import { IFormContent } from '../form-models';
import { FormActionRenderService } from '../actions/form-action-render.service';

@Component({
  selector: 'ce-form-factory',
  templateUrl: './form-factory.component.html',
  styleUrls: ['./form-factory.component.scss']
})
export class CeFormFactoryComponent implements OnInit, IFormContent, AfterViewInit {

  _formWrapper: FormWrapper;
  get formWrapper(): FormWrapper {
    return this._formWrapper;
  }

  @Input() set formWrapper(value: FormWrapper) {
    this._formWrapper = value;
    this.updateComponent();
  }

  _formMask: FormInstanceMaskWrapper | undefined;
  get formMask(): FormInstanceMaskWrapper | undefined {
    return this._formMask;
  }

  @Input() set formMask(value: FormInstanceMaskWrapper | undefined) {
    this._formMask = value;
    this.updateComponent();
  }

  _rebuildOnChanges: boolean = false;
  get rebuildOnChanges(): boolean {
    return this._rebuildOnChanges;
  }

  @Input() set rebuildOnChanges(value: boolean) {
    this._rebuildOnChanges = value;
    this.updateComponent();
  }

  @Output() formChanges = new EventEmitter<FormWrapper>();

  @ViewChild('container', { read: ViewContainerRef }) vcr: ViewContainerRef;

  private formComponent: ComponentRef<IFormContent>;
  private formComponentSubscriptions?: Subscription;
  private lastComponentType: Type<any>;

  constructor(
    private formActionService: FormActionRenderService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateComponent();
  }

  private updateComponent() {

    if (!this.vcr) {
      return;
    }

    const componentRoot = this.formWrapper.core;

    if (!this.formComponent) {
      this.createComponent(componentRoot);
    } else if (!this.isSameComponentType(this.lastComponentType, componentRoot)) {
      this.recreateComponent(componentRoot);
    } else {
      this.connectInputs(this.formComponent.instance);
      this.formComponent.changeDetectorRef.detectChanges();
    }
  }

  private isSameComponentType(prev: Type<any>, form: FormInstance) {
    return prev === this.formActionService.getRenderFromForm(form);
  }

  private recreateComponent(form: FormInstance) {

    if (!this.vcr) {
      return;
    }

    this.formComponentSubscriptions?.unsubscribe();
    this.vcr.remove();
    this.createComponent(form);
  }

  private createComponent(form: FormInstance) {

    if (!this.vcr) {
      return;
    }

    const componentType = this.formActionService.getRenderFromForm(form);
    if (componentType) {
      this.formComponent = this.vcr.createComponent(componentType);
    }
    this.lastComponentType = componentType;
    this.connectInputs(this.formComponent.instance);
    this.connectOutputChangedEvent(this.formComponent.instance);
    this.formComponent.changeDetectorRef.detectChanges();
  }

  private connectInputs(component: IFormContent) {
    component.formWrapper = this.formWrapper;
    component.formMask = this.formMask;
    component.rebuildOnChanges = this.rebuildOnChanges;
  }

  private connectOutputChangedEvent(component: IFormContent) {
    this.formComponentSubscriptions = component.formChanges?.subscribe(
      (value) => this.formChanges.next(value),
      (error) => this.formChanges.error(error),
      () => this.formChanges.complete()
    );
  }
}
