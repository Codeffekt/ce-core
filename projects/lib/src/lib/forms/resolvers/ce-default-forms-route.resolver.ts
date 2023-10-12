import { CeFormRouteParams } from "../form-route.resolver";
import { CeFormsRouteActions, CeFormsRouteResolver } from "../forms-route.resolver";

export class CeDefaultFormsRouteResolver implements CeFormsRouteResolver {
    
    resolve(action: CeFormsRouteActions, id?: string, pid?: string): CeFormRouteParams {
        return {
            route: id ? [...action.split("."), id] : action.split(".")
        };
    }

}