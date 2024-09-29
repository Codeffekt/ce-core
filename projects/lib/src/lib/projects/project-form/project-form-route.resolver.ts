import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FormInstance } from "@codeffekt/ce-core-data";
import { CeFormRouteParams, ICeFormRouteResolver } from "../../forms/form-route.resolver";
import { CeProjectsService } from "../../services/ce-projects.service";
import { CeBreadcrumbsService, CeFormEditorService } from "../../services";

/**
 * Permet de gerer l'url de destination ainsi que l'élément actif dans le breadcrumb
 * lorsque un index est click dans un formulaire. On doit pouvoir facilement switch
 * entre 2 éléments présents dans le breadcrumb.
 * - on doit éviter les boucles infinis sur les liens entre les formulaires
 * - si un formulaire a déjà été suivi (l'id du formulaire est déjà dans l'url) alors
 *   on check l'élément actif du breadcrumb :
 * -- si l'élément actif se trouve après l'id déjà existant alors on ne fait que
 * switch l'élément actif du breadcrumb et on garde la même url
 * -- si l'élément actif se trouve avant l'id déjà existant alors on génère une nouvelle url
 * en rajoutant l'id juste après l'élément actif du breadcrumb
 *  */
@Injectable()
export class CeProjectFormRouteResolver implements ICeFormRouteResolver {

    constructor(
        protected projectService: CeProjectsService,
        private breadcrumbsService: CeBreadcrumbsService,
        private formEditorService: CeFormEditorService,
        private router: Router,
    ) { }

    navigate(formId: string): Promise<boolean> {
        const routeParams = this.resolve(undefined, formId, undefined);
        return this.router.navigate(routeParams.route);        
    }       
    
    resolve(_: string, formId: string, __: FormInstance): CeFormRouteParams {

        const currentUrl = this.getCurrentUrl();

        const items = this.breadcrumbsService.getLastItems();
        const currentActiveItem = this.breadcrumbsService.getLastActiveItem();

        if (!items.length || !currentActiveItem) {
            return this.addRelativeRoute([ currentUrl, formId ]);
        }

        const existingItemPos = items.findIndex(item => item.id === formId);

        if (existingItemPos === -1) {
            return this.addRelativeRoute([ currentUrl, formId ]);
        }

        const currentActiveItemPos = items.findIndex(item => item.id === currentActiveItem.id);

        if (existingItemPos <= (currentActiveItemPos + 1)) {
            const existingItem = items[existingItemPos];
            this.formEditorService.setCurrentFormInfo(existingItem.data);
            this.breadcrumbsService.setActiveItem(existingItem);
            return this.getSameRoute(currentUrl);
        } else {
            const activeItem = items[currentActiveItemPos];
            const activeRouteIndex = currentUrl.indexOf(activeItem.id);
            return this.addRelativeRoute([ 
                currentUrl.substring(0, activeRouteIndex), 
                activeItem.id,
                formId 
            ]);
        }
    }    

    private getCurrentUrl() {
        return this.router.routerState.snapshot.url;
    }

    private getSameRoute(currentUrl: string) {
        return { route: [currentUrl] };
    }

    private addRelativeRoute(paths: string[]) {
        return { route: paths };
    }    
}