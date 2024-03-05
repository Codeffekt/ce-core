import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { CeAppRunnerService } from "../services/ce-app-runner.service";

@Injectable({
    providedIn: 'root'
})
export class CeProjectGuard  {
    constructor(private readonly appRunnerService: CeAppRunnerService) { }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        
        const projectId = route.paramMap.get('project');        

        if(!projectId) {
            return false;
        }
        
        try {
            await this.appRunnerService.fetchAppProject(projectId);
        } catch(err) {            
            return false;
        }
        return true;
    }

    
}