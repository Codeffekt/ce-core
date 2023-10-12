import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormInstanceMaskWrapper } from '@codeffekt/ce-core-data';
import { MockApiService } from '../../api/mock-api.service';

@Injectable({
    providedIn: 'root'
})
export class FormMaskResolverService implements Resolve<FormInstanceMaskWrapper> {

    constructor(private apiService: MockApiService) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormInstanceMaskWrapper> {
        const id = route.paramMap.get('id');
        const formMask = await this.apiService.getFormMaskById(id);
        return new FormInstanceMaskWrapper(formMask);
    }
}
