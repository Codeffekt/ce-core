import { AbstractControl, UntypedFormArray, UntypedFormBuilder } from "@angular/forms";

export abstract class AbstractFormArray<T> extends UntypedFormArray {

    constructor(private fb: UntypedFormBuilder) {
        super([]);
    }

    setValues(values: T[] | undefined) {

        if (!values) {
            this.clear();
            return;
        }

        const addedValues: T[] = values.filter(value => !this.formArrayControls.find(control => this.checkEquals(control.value, value)));
        const existingValues: T[] = values.filter(value => !!this.formArrayControls.find(control => this.checkEquals(control.value, value)));
        const removedValues: T[] = this.formArrayControls.filter(control => !values.find(value => this.checkEquals(value, control.value)))
            .map(cv => cv.value);

        addedValues.forEach(value => {
            this.push(this.fb.group(value as any), { emitEvent: true });
        });

        existingValues.forEach(value => {
            const control = this.findControl(value);
            control?.patchValue(value, { emitEvent: false });
        });

        removedValues.forEach((value, index) => {
            const control = this.findControl(value);
            if (control) {
                this.removeAt(index);
            }
        });
    }

    abstract checkEquals(value1: T, value2: T): boolean;

    private findControl(value: T): AbstractControl | undefined {
        return this.controls.find(cv => this.checkEquals(cv.value, value));
    }

    private get formArrayControls(): AbstractControl[] {
        return this.controls;
    }
}
