import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { FormInfo } from "@codeffekt/ce-core";
import { FormEditorService } from "./form-editor.service";

@Injectable({ providedIn: 'root' })
export class FormEditorResolverService  {
    constructor(private formEditorService: FormEditorService) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormInfo> {
        const id = route.paramMap.get('form');
        const form = await this.formEditorService.getForm(id);
        return form;        
    }
}
