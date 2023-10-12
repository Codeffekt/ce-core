import { Injectable } from "@angular/core";
import { FormInstance, IndexType } from "@codeffekt/ce-core-data";

export type CeFormRouteParams = {
    route: any[];
    isRelativeRoute?: boolean;
}
export interface ICeFormRouteResolver {
    resolve(formField: string, formId: IndexType, formInstance: FormInstance): CeFormRouteParams;
}

@Injectable({
    providedIn: 'root'
})
export class CeFormRouteResolver implements ICeFormRouteResolver {
    resolve(formField: string, formId: IndexType, formInstance: FormInstance): CeFormRouteParams {
        return { route: ['/form', formId] };
    }
}