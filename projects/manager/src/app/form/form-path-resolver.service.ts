import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { SpaceFormPathService } from "@codeffekt/ce-core";
import { IndexType } from "@codeffekt/ce-core-data";

@Injectable()
export class FormPathResolverService  {
    constructor(
        private pathService: SpaceFormPathService,
    ) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IndexType> {
        const id = route.paramMap.get('formPath');

        if (id === null) {
            throw new Error(`FormPath cannot be null`);
        }

        this.pathService.setCurrentPath(id);
        return id;
    }
}
