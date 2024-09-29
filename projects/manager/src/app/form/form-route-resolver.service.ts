import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICeFormRouteResolver } from "@codeffekt/ce-core";
import { FormInstance, IndexType } from "@codeffekt/ce-core-data";
import { FormPathService } from "./form-path.service";

@Injectable()
export class FormRouteResolver implements ICeFormRouteResolver {
    private router = inject(Router);
    private formPathService = inject(FormPathService);
    private activatedRoute = inject(ActivatedRoute);

    resolve(formField: string, formId: IndexType, formInstance: FormInstance): Promise<boolean> {
        return this.router.navigate(["../", this.formPathService.getPath(formId)], { relativeTo: this.activatedRoute });
    }
}