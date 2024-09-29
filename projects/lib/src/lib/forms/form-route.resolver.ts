import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FormInstance, IndexType } from "@codeffekt/ce-core-data";

export type CeFormRouteParams = {
    route: any[];
    isRelativeRoute?: boolean;
}
export interface ICeFormRouteResolver {
    resolve(formField: string, formId: IndexType, formInstance: FormInstance): Promise<boolean>;
}

@Injectable({
    providedIn: 'root'
})
export class CeFormRouteResolver implements ICeFormRouteResolver {

    private router = inject(Router);

    resolve(formField: string, formId: IndexType, formInstance: FormInstance): Promise<boolean> {
        return this.router.navigate(['/form', formId]);
    }
}