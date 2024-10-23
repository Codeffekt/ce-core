import { Directive, inject } from "@angular/core";
import { FormPathService } from "./form-path.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs";
import { CeFormEditorService } from "@codeffekt/ce-core";
import { IndexType } from "@codeffekt/ce-core-data";

@UntilDestroy()
@Directive({
    standalone: true,
    selector: '[formUrlQueryParams]'
})
export class FormUrlQueryParamsDirective {

    private formEditorService = inject(CeFormEditorService);
    private formService = inject(FormPathService);
    private activatedRoute = inject(ActivatedRoute);

    constructor() {
        this.activatedRoute.queryParamMap.pipe(
            untilDestroyed(this),            
            filter(params => params.get('form') !== null),
        ).subscribe(params => {            
            const id = params.get('form');
            this.updateForm(id!);
        });
    }

    private async updateForm(formId: IndexType) {
        console.log("UpdateForm", formId);
        const form = await this.formEditorService.getForm(formId);
        this.formService.setCurrentForm(form);
    }
}