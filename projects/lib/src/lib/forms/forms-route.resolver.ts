import { InjectionToken } from "@angular/core";
import { CeFormRouteParams } from "./form-route.resolver";

export const CE_FORMS_ROUTE_RESOLVER = new InjectionToken<string>('forms.route.resolver');

export type CeFormsRouteActions = "forms"|"forms.new"|"formsroot"|"formsroot.new"|"forms.edit"|"formsroot.edit";

export interface CeFormsRouteResolver {
    resolve(action: CeFormsRouteActions, id?: string, pid?: string): CeFormRouteParams;
}

