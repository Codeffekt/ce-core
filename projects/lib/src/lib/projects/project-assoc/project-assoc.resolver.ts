import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CeFormInfoBreadcrumbsService } from "../../services/ce-form-info-breadcrumbs.service";
import { FormInfo } from "../../models";
import { CeFormEditorService } from "../../services/ce-form-editor.service";

@Injectable({ providedIn: 'root' })
export class CeProjectAssocResolver  {

    constructor(
        private formEditorService: CeFormEditorService,
        private formInfoBreadcrumbs: CeFormInfoBreadcrumbsService,    
    ) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormInfo> {
        const assoc = route.paramMap.get('assoc');
        const form = await this.formEditorService.getFormAssoc(assoc!);
        this.formInfoBreadcrumbs.processFormInfo(form);
        return form;
    }

}