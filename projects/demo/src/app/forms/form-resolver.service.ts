import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { MockFormEditorService } from './mock-form-editor.service';

@Injectable({
    providedIn: 'root'
})
export class FormResolverService implements Resolve<FormWrapper<any>> {

    constructor(private mockFormService: MockFormEditorService) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormWrapper<any>> {
        const id = route.paramMap.get('id');
        const formInfo = await this.mockFormService.getForm(id);
        return formInfo.form;
    }
}
