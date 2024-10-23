import { Injectable } from "@angular/core";
import { UntypedFormControl, ValidatorFn, Validators } from "@angular/forms";
import { FormBlock, FormInstanceBase, FormUtils } from "@codeffekt/ce-core-data";
import { FormValidators } from "./form.validators";

export type FormControls = { [key: string]: UntypedFormControl };

@Injectable()
export class FormControlsBuilder {

    build(form: FormInstanceBase): FormControls {
        const formBlocks = FormUtils.getBlocks(form);
        const controls =
            formBlocks.reduce((controls: FormControls, formBlock: FormBlock) => {
                const validators = this.buildFormBlockValidators(formBlock);
                const formControl = new UntypedFormControl(formBlock.value, validators);
                return { ...controls, ...{ [formBlock.field]: formControl } }
            }, {});

        return controls;
    }

    private buildFormBlockValidators(formBlock: FormBlock): ValidatorFn[] {
        const validators: ValidatorFn[] = [];

        if (
            formBlock.required ||
            (!formBlock.required && this.hasFormValidator(formBlock, 'required'))
        ) {
            validators.push(Validators.required)
        }

        if (formBlock.type === 'number') {
            if (this.hasFormValidator(formBlock, 'range')) {
                const rangeValidator = this.getFormValidator(formBlock, 'range');
                const minRange: number = rangeValidator.params.min;
                const maxRange: number = rangeValidator.params.max;
                validators.push(FormValidators.range(minRange, maxRange));
            }

            if (this.hasFormValidator(formBlock, 'min')) {
                const minValidator = this.getFormValidator(formBlock, 'min')
                validators.push(Validators.min(minValidator.params.value));
            }

            if (this.hasFormValidator(formBlock, 'max')) {
                const maxValidator = this.getFormValidator(formBlock, 'max')
                validators.push(Validators.max(maxValidator.params.value));
            }
        }

        if (this.hasFormValidator(formBlock, 'pattern')) {
            const patternValidator = this.getFormValidator(formBlock, 'pattern')
            validators.push(Validators.pattern(patternValidator.params.value));
        }

        return validators;
    }

    private hasFormValidator(formBlock: FormBlock, validatorName: string): boolean {
        const validator = this.getFormValidator(formBlock, validatorName);
        return !!validator;
    }

    private getFormValidator(formBlock: FormBlock, validatorName: string): any {
        const validators = formBlock.params?.validators;
        if (!validators) {
            return null;
        }

        return validators.find((validator: any) => validator.name === validatorName);
    }
}