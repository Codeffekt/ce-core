import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormInstance, IndexType } from "@codeffekt/ce-core-data";
import { CeFormRouteParams, ICeFormRouteResolver } from "../forms/form-route.resolver";
import { SpaceFormPathService } from "./space-form-path.service";

@Injectable()
export class SpaceFormRouteResolver implements ICeFormRouteResolver {
    
    private router = inject(Router);
    private formPathService = inject(SpaceFormPathService);
    private activatedRoute = inject(ActivatedRoute);

    resolve(formField: string, formId: IndexType, formInstance: FormInstance): CeFormRouteParams {
        return {
            route: this.getRoute(formId),
            isRelativeRoute: true,
        };
    }

    navigate(formId: IndexType, formInstance: FormInstance): Promise<boolean> {
        return this.router.navigate(this.getRoute(formId), { relativeTo: this.activatedRoute });
    }

    private getRoute(formId: IndexType) {
        return ["../", this.formPathService.getPath(formId)];
    }
}