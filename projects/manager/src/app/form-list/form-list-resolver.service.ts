import { inject } from "@angular/core";
import { RedirectCommand, ResolveFn, Router } from "@angular/router";
import { FormRoot } from "@codeffekt/ce-core-data";
import { FormListService } from "./form-list.service";

export const formListResolver: ResolveFn<FormRoot> = async (route, state) => {

    const rootId = route.paramMap.get('id');

    const router = inject(Router);

    if(!rootId) {
        return new RedirectCommand(router.parseUrl("/forms"));
    }

    const root = await inject(FormListService).setRoot(rootId);

    if(!root) {
        return new RedirectCommand(router.parseUrl("/forms"));
    }

    return root;
}