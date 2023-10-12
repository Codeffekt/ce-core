import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { FormInfo } from "../models/form-info";
import { CeFormEditorService } from "../services/ce-form-editor.service";
import { CeFormInfoBreadcrumbsService } from "../services";

@Injectable({ providedIn: 'root' })
export class FormEditorResolverService implements Resolve<FormInfo> {
    constructor(
        private formEditorService: CeFormEditorService,
        private formInfoBreadcrumbs: CeFormInfoBreadcrumbsService,        
    ) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormInfo> {
        const id = route.paramMap.get('form');
        const form = await this.formEditorService.getForm(id);
        this.formInfoBreadcrumbs.processFormInfo(form);
        return form;
    }
}
