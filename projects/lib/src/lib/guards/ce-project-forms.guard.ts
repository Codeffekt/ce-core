import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { CeAppRunnerService } from "../services/ce-app-runner.service";

@Injectable({
    providedIn: 'root'
})
export class CeProjectFormsGuard  {
    constructor(private readonly appRunnerService: CeAppRunnerService) { }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        
        const assocId = route.paramMap.get('assocId');
        if(!assocId) {
            return false;
        }
        
        try {            
            await this.appRunnerService.fetchProjectFormAssoc(assocId);
        } catch(err) {
            return false;
        }        

        return true;
    }

    
}