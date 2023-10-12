import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class FormBlockStateMatcher implements ErrorStateMatcher {

  constructor(private formField: string) { }

  isErrorState(control: FormControl | null, formGroupDirective: FormGroupDirective | NgForm | null): boolean {
    
    // allow matInput to show error as soon as parent FormControl is invalid 
    return formGroupDirective.form.controls[this.formField]?.invalid;
  }
}
