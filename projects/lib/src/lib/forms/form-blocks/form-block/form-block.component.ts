import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBlock, FormInstanceExt } from '@codeffekt/ce-core-data';
import { Observable, Subject } from 'rxjs';
import { FormBlockStateMatcher } from './form-block-state-matcher';

export interface FormBlockComponentAccessor<T = any> {
  formBlock: FormBlock;
  formInstance: FormInstanceExt;
  formControl: AbstractControl;

  valueChanges(): Observable<T>;
  patchValue(value: T);  
}

export class FormBlockComponent<T> implements FormBlockComponentAccessor<T> {

  errors: ValidationErrors;
  formControl: AbstractControl;
  stateMatcher: FormBlockStateMatcher;

  private _value: T;
  private _formBlock: FormBlock;
  private _formInstance: FormInstanceExt;
  private value$ = new Subject<T>();

  valueChanges(): Observable<T> {
    return this.value$;
  }

  set formBlock(formBlock: FormBlock) {
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

  set value(value: T) {
    this.patchValue(value);
    this.notifyValueUpdate();
  }

  get value(): T {
    return this._value;
  }

  patchValue(value: T) {
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