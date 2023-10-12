import { AfterViewInit, Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBlock, FormInstance } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBlockFactoryService } from '../form-block-factory/form-block-factory.service';
import { FormBlockComponentAccessor } from '../form-block/form-block.component';
@UntilDestroy()
@Component({
  selector: 'ce-form-block-factory',
  templateUrl: './form-block-factory.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormBlockFactoryComponent,
    multi: true
  }],
  styleUrls: ['./form-block-factory.component.scss']
})
export class FormBlockFactoryComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() formBlock: FormBlock;
  @Input() formInstance: FormInstance;
  @Input() formControlName: string;

  @ViewChild(FormControlDirective) formControlDirective: FormControlDirective;

  @ViewChild('container', { read: ViewContainerRef }) vcr: ViewContainerRef;

  value: any;  
  isDisabled: boolean;  

  private formBlockComponent: ComponentRef<FormBlockComponentAccessor>;

  private onTouched: () => void;
  private onChange: (value: any) => void;

  constructor(
    private factoryService: FormBlockFactoryService,
    private controlContainer: ControlContainer,   
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const componentType = this.factoryService.getComponentType(this.formBlock)
    if (componentType) {       
      this.formBlockComponent = this.vcr.createComponent<FormBlockComponentAccessor>(componentType);
      this.formBlockComponent.instance.formBlock = this.formBlock;
      this.formBlockComponent.instance.formInstance = this.formInstance;
      this.formBlockComponent.instance.formControl = this.controlContainer.control.get(this.formControlName);
      this.formBlockComponent.instance.valueChanges()
        .pipe(untilDestroyed(this))
        .subscribe(value => this.setValue(value));
      this.formBlockComponent.changeDetectorRef.detectChanges();
    }
  }  

  writeValue(obj: any): void {
    this.value = obj;
    if (this.formBlockComponent) {
      this.formBlockComponent.instance.patchValue(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setValue(value: any) {
    if (this.isDisabled) {
      return;
    }
    this.value = value;
    this.onTouched();
    this.onChange(this.value);
  }
}
