import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CeFormsService, CeSpacesService } from '../services';
import { SpaceEditorInfo } from '../models';
import { firstValueFrom } from 'rxjs';
import { FormSpaceEditorFormatWrapper } from '@codeffekt/ce-core-data';

@Injectable({ providedIn: 'root' })
export class SpaceEditorResolverService  {
    constructor(
        private spacesService: CeSpacesService,
        private formsService: CeFormsService,
        private router: Router) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SpaceEditorInfo> {
        const id = route.paramMap.get('form');
        
        if(!id) {
            throw new Error(`No form route param`);
        }

        const form = await firstValueFrom(this.formsService.getRawFormQuery(id, { extMode: true }));
        const project = await this.spacesService.getSpaceEditor(id);

        return {
            form: new FormSpaceEditorFormatWrapper(form),
            project
        };
    }
}
