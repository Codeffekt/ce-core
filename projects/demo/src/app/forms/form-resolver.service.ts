import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { MockFormEditorService } from './mock-form-editor.service';

@Injectable({
    providedIn: 'root'
})
export class FormResolverService  {

    constructor(private mockFormService: MockFormEditorService) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormWrapper<any>> {
        const id = route.paramMap.get('id');

        if(!id) {
            throw new Error(`Invalid id ${id}`);
        }

        const formInfo = await this.mockFormService.getForm(id);
        return formInfo.form;
    }
}
