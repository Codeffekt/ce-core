import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { FormInfo } from "../models";
import { CeFormEditorService, CeProjectsService } from "../services";

@Injectable({ providedIn: 'root' })
export class FormEditorAssocResolverService implements Resolve<FormInfo> {
    constructor(
        private formEditorService: CeFormEditorService,
        private projectService: CeProjectsService
        ) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormInfo> {
        const pid = this.projectService.getCurrentProjectId();
        const form = await this.formEditorService.getForm(pid);
        return form;        
    }
}
