import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { FormPathService } from "./form-path.service";
import { IndexType } from "@codeffekt/ce-core-data";

@Injectable()
export class FormPathResolverService  {
    constructor(
        private formService: FormPathService,        
    ) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IndexType> {
        const id = route.paramMap.get('formPath');        
        this.formService.setCurrentPath(id);
        return id;
    }
}
