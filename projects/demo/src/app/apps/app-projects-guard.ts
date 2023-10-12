import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { CeAppRunnerService } from '@codeffekt/ce-core';

@Injectable({
    providedIn: 'root'
})
export class CeAppProjectsGuard implements CanActivate {
    constructor(private readonly appRunnerService: CeAppRunnerService) { }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {        
        try {
            await this.appRunnerService.fetchAppProjects();
        } catch(err) {
            throw err;
            return false;
        }
        return true;
    }
}