/* import { Inject, Injectable } from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { CeAppConfig, CE_APP_CONFIG } from '../ce-core.config';
import { CeAppRunnerService } from '../services/ce-app-runner.service';

@Injectable({ providedIn: 'root' })
export class CeAppConfigResolverService implements Resolve<CeAppConfig> {
    constructor(
        @Inject(CE_APP_CONFIG) private config: CeAppConfig,
        private appRunnerService: CeAppRunnerService,        
        private router: Router) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CeAppConfig> {
        try {
            await this.appRunnerService.fetchCurrentApp(this.config.);
        } catch(err) {
            return false;
        }
        return true;
    }
}
 */