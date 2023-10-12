import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidators {

    static range(min: number, max: number): ValidatorFn {
        const validatorFn = (formControl: AbstractControl): ValidationErrors => {
            if (formControl.value != null && (formControl.value < min || formControl.value > max)) {
                return { range: { min, max } }
            }
            return null;
        }

        return validatorFn;
    }
}