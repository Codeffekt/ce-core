import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { CeAppRunnerService } from '@codeffekt/ce-core';

@Injectable({
    providedIn: 'root'
})
export class CeAppGuard  {
    constructor(private readonly appRunnerService: CeAppRunnerService) { }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        const appId = route.paramMap.get('appId');
        if(!appId) {
            return false;
        }

        try {
            await this.appRunnerService.fetchCurrentApp(appId);
        } catch(err) {
            return false;
        }
        return true;
    }
}