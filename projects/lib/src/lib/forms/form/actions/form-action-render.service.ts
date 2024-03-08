import { Injectable, Type } from "@angular/core";
import { FormActionService } from "./form-action.service";
import { FormInstance } from "@codeffekt/ce-core-data";

@Injectable({ providedIn: 'root'})
export class FormActionRenderService {

    constructor(        
        private formActionService: FormActionService,
      ) { }

    getRenderFromForm<T = any>(form: FormInstance): Type<T> {
        return this.formActionService.getRenderFromForm(form);
    }
}