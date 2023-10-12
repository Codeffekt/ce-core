import {
  Component, EventEmitter,
  HostBinding, Input,
  OnDestroy,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  FormInstance, FormInstanceMaskWrapper,
  FormWrapper
} from '@codeffekt/ce-core-data';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { FormControlsBuilder } from './form-controls.builder';
import { FormMaskBuilder } from './form-mask.builder';
import { IFormContent } from './form-models';
import { FormCard, FormStyleBuilder } from './form-style.builder';

const DEBOUNCE_TIME_MS = 1000;
const CE_FORM_CSS_CLASS_NAME = "ce-form";
@Component({
  selector: 'ce-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormControlsBuilder]
})
export class CeFormComponent<T = any> implements OnDestroy, IFormContent {

  _formWrapper: FormWrapper;
  get formWrapper(): FormWrapper {
    return this._formWrapper;
  }

  @Input() set formWrapper(value: FormWrapper) {

    const oldId = this._formWrapper?.core.id;
    this._formWrapper = value;

    if (
      this.rebuildOnChanges ||
      oldId !== this._formWrapper?.core.id
    ) {
      this.formInstance = this.formMaskBuilder.build(<FormInstance>(this._formWrapper?.core), this.formMask);
      this.buildCards();
      this.buildForm();
      this.updateCSSClassNames();
    }
    else if (this.lastUpdatedTime < this._formWrapper.core.mtime) {
      this.patchUpdatedProps();
    }
  }

  _formMask: FormInstanceMaskWrapper | undefined;
  get formMask(): FormInstanceMaskWrapper | undefined {
    return this._formMask;
  }

  @Input() set formMask(value: FormInstanceMaskWrapper | undefined) {
    const oldMask = this._formMask;
    this._formMask = value;
    if (this.rebuildOnChanges || !oldMask) {
      this.formInstance = this.formMaskBuilder.build(<FormInstance>(this.formWrapper?.core), this._formMask);
      this.buildCards();
      this.buildForm();
    }
  }

  @Input() rebuildOnChanges = false;

  @Output() formChanges = new EventEmitter<FormWrapper<T>>();

  @HostBinding('class.invalid')
  get isInvalid() { return this.formGroup && !this.formGroup?.valid; }

  formGroup: FormGroup;

  formInstance: FormInstance;

  lastUpdatedTime: number = 0;

  cards: FormCard[] = [];

  cssFormClassNames = [CE_FORM_CSS_CLASS_NAME];

  private subscription: Subscription;

  private formMaskBuilder = new FormMaskBuilder();
  private formStyleBuilder = new FormStyleBuilder();

  constructor(
    private fb: FormBuilder,
    private formControlsBuilder: FormControlsBuilder,
  ) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private buildForm() {
    this.unsubscribeFormChanges();
    if (this.formInstance) {
      const controls = this.formControlsBuilder.build(this.formInstance);
      this.formGroup = this.fb.group(controls);
      this.formGroup.markAllAsTouched();
      this.subscribeFormChanges();
    }
  }

  private buildCards() {
    this.cards = this.formStyleBuilder.buildCards(this.formInstance, this.formMask);
  }

  private subscribeFormChanges() {
    this.subscription = this.formGroup.valueChanges.pipe(
      tap(_ => this.lastUpdatedTime = Date.now()),
      debounceTime(DEBOUNCE_TIME_MS)
    )
      .subscribe(_ => this.update());
  }

  private unsubscribeFormChanges() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private update() {
    this.formWrapper.updateProps(this.formGroup.value, this.formWrapper.core as FormInstance);
    this.formWrapper.core.mtime = this.lastUpdatedTime;
    this.formWrapper.setFormValid(this.formGroup.valid);
    this.formWrapper.fill();
    this.formChanges.next(this.formWrapper);
  }

  private patchUpdatedProps() {
    this.formGroup.patchValue(this.formWrapper.props, { emitEvent: false });
  }

  private updateCSSClassNames() {
    const rootCssName = `${CE_FORM_CSS_CLASS_NAME}-${(<any>this.formWrapper.core).root}`;
    this.cssFormClassNames = [CE_FORM_CSS_CLASS_NAME, rootCssName];
  }
}
