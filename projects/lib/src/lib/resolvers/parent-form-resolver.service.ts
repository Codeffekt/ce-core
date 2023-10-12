import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { FormInfo } from "../models";
import { CeFormEditorService } from "../services";

@Injectable({ providedIn: 'root' })
export class ParentFormResolverService implements Resolve<FormInfo> {
    constructor(private formEditorService: CeFormEditorService) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormInfo> {
        const parentForm = this.formEditorService.getCurrentFormInfo();        
        return parentForm;
    }
}
