import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CeAppRunnerService } from '../services/ce-app-runner.service';
import { FormInfo } from '../models';
import { CeFormInfoBreadcrumbsService } from '../services';

/**
 * Similar to project resolver but load masks, styles and queries
 */
@Injectable({ providedIn: 'root' })
export class ProjectConfigResolverService  {
    constructor(
        private appRunnerService: CeAppRunnerService, 
        private formInfoBreadcrumbs: CeFormInfoBreadcrumbsService,             
        private router: Router) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormInfo> {
        const id = route.paramMap.get('project');

        if(!id) {
            throw new Error(`No project route param`);
        }

        const formInfo = await this.appRunnerService.fetchAppProject(id);
        if (formInfo.form) {
            this.formInfoBreadcrumbs.processFormInfo(formInfo);            
            return formInfo;
        } else { // id not found
            this.router.navigate(['/users']);
            return null as any;
        }
    }
}
