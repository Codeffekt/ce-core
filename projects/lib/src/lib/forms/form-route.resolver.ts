import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FormInstance, IndexType } from "@codeffekt/ce-core-data";

export type CeFormRouteParams = {
    route: any[];
    isRelativeRoute?: boolean;
}
export interface ICeFormRouteResolver {
    navigate(formId: IndexType, formInstance?: FormInstance): Promise<boolean>;
    resolve(formId: IndexType, formField?: string, formInstance?: FormInstance): CeFormRouteParams;
}

@Injectable({
    providedIn: 'root'
})
export class CeFormRouteResolver implements ICeFormRouteResolver {

    private router = inject(Router);

    navigate(formId: IndexType, formInstance?: FormInstance): Promise<boolean> {
        return this.router.navigate(['/form', formId]);
    }

    resolve(formId: IndexType, formField?: string, formInstance?: FormInstance): CeFormRouteParams {
        return { route: ['/form', formId] };
    }
}