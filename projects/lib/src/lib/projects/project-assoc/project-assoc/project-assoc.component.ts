import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBlock, FormInstanceMaskWrapper, FormWrapper } from "@codeffekt/ce-core-data";
import { IFormContent } from "../../../forms/form/form-models";
@Component({
  selector: 'app-project-assoc',
  templateUrl: './project-assoc.component.html',
  styleUrls: ['./project-assoc.component.scss']
})
export class CeProjectAssocComponent implements IFormContent {
  
  _formWrapper: FormWrapper;
    get formWrapper(): FormWrapper {
        return this._formWrapper;
    }

    @Input() set formWrapper(value: FormWrapper) {

        this._formWrapper = value;
        this.assoc = FormWrapper.getFormValue("assoc", this._formWrapper.core);
    }


    @Input() formMask: FormInstanceMaskWrapper | undefined;
    @Input() rebuildOnChanges = false;

    @Output() formChanges = new EventEmitter<FormWrapper>();

    assoc: FormBlock;

    constructor() { }    
}
