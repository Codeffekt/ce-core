import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBlock, FormInstanceExt } from '@codeffekt/ce-core-data';
import { Observable, Subject } from 'rxjs';
import { FormBlockStateMatcher } from './form-block-state-matcher';

export interface FormBlockComponentAccessor<T = any> {
  formBlock: FormBlock;
  formInstance: FormInstanceExt;
  formControl: AbstractControl;

  valueChanges(): Observable<T>;
  patchValue(value: T): void;  
}

export class FormBlockComponent<T extends FormBlock = FormBlock> implements FormBlockComponentAccessor<T> {

  errors!: ValidationErrors;
  formControl!: AbstractControl;
  stateMatcher!: FormBlockStateMatcher;

  private _value!: T["value"];
  private _formBlock!: T;
  private _formInstance!: FormInstanceExt;
  private value$ = new Subject<T["value"]>();

  valueChanges(): Observable<T["value"]> {
    return this.value$;
  }

  set formBlock(formBlock: T) {
    this._formBlock = formBlock
    this.value = this.formBlock.value;
    this.stateMatcher = new FormBlockStateMatcher(this._formBlock.field);
    this.formBlockChanged();
  }

  get formBlock(): FormBlock {
    return this._formBlock;
  }

  set formInstance(formInstance: FormInstanceExt) {
    this._formInstance = formInstance;
  }

  get formInstance(): FormInstanceExt {
    return this._formInstance;
  }

  set value(value: T["value"]) {
    this.patchValue(value);
    this.notifyValueUpdate();
  }

  get value(): T["value"] {
    return this._value;
  }

  patchValue(value: T["value"]) {
    this._value = value;
    this.formBlock.value = this._value;
  }

  /**
   * Override this method to be reactive when the property
   * FormBlock is changed
   */
  formBlockChanged() {    
  }

  protected notifyValueUpdate() {
    this.value$.next(this._value);
  }
}