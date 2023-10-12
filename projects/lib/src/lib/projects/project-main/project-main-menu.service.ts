import { Inject, Injectable } from "@angular/core";
import { Route, Router, Routes } from "@angular/router";
import { CeAuthZService } from "../../services/ce-authz.service";
import { CeActiveProjectMenuEntry, CeProjectMainModuleConfig, CeProjectMenuEntry, CE_PROJECT_MAIN_CONFIG } from "./project-main-models";

export const DEFAULT_CE_PROJECT_MAIN_CONFIG: CeProjectMainModuleConfig = {
    menuEntries: [{
        route: {
            path: ':assoc',
            data: {
                routeId: 'assoc',
                useParams: true,
            },
            loadChildren: () => import("../project-assoc/project-assoc.module").then(m => m.CeProjectAssocModule)
        },
    }],
};

@Injectable()
export class CeProjectMainMenuService {

    readonly entries!: CeProjectMenuEntry[];
    readonly defaultRoutePath: string | undefined;

    constructor(
        private authzService: CeAuthZService,
        @Inject(CE_PROJECT_MAIN_CONFIG) config: CeProjectMainModuleConfig
    ) {

        // Override menu entry's route 
        const customMenuEntries = config.menuEntries.map(entry => entry.keepDefaultRoute ? { ...entry, route: this.retrieveDefaultRoute(entry) } : entry);

        this.entries = [
            ...DEFAULT_CE_PROJECT_MAIN_CONFIG.menuEntries
                .filter(elt => !customMenuEntries.find(newElt => newElt.route.path === elt.route.path)),
            ...customMenuEntries
        ];

        this.defaultRoutePath = config.defaultRoutePath;
    }

    private retrieveDefaultRoute(menuEntry: CeProjectMenuEntry) {
        return DEFAULT_CE_PROJECT_MAIN_CONFIG.menuEntries.find(entry => entry.route.path === menuEntry.route.path)?.route ?? menuEntry.route;
    }

    static init(router: Router, menuService: CeProjectMainMenuService) {
        return () => {
            const config = [...router.config];
            const route = menuService.getIsRootRoute(config);

            if (!route) {
                throw new Error("Missing isRoot data in CeProjectMainModule router.");
            }

            const newEntries: CeProjectMenuEntry[] = menuService.defaultRoutePath ? [
                { route: { path: '', redirectTo: menuService.defaultRoutePath, pathMatch: 'full' } },
                ...menuService.entries
            ] : menuService.entries;

            const existingRoutes = route?.children || [];
            const oldRoutes = existingRoutes.filter(elt => !newEntries.find(newElt => elt.path === newElt.route.path));
            const newRoutes = [...oldRoutes, ...newEntries.filter(entry => !entry.disabled).map(entry => entry.route)];
            route.children = newRoutes;

            router.resetConfig(config);
        }
    }

    getActiveMenuEntries(): CeProjectMenuEntry[] {
        return this.entries.filter(entry => !entry.disabled && entry.label && this.checkAuthzResources(entry)) as CeActiveProjectMenuEntry[];
    }

    getIsRootRoute(routes: Routes): Route {
        const route = routes.find((child) => child.data?.isRoot);
        if(!route) {
            const childrenWithRoutes = routes.filter(child => child.children?.length);
            for(const child of childrenWithRoutes) {
                const routeInChild = this.getIsRootRoute(child.children);
                if(routeInChild) {
                    return routeInChild;
                }
            }
        }
        return route;
    }    

    private checkAuthzResources(menuEntry: CeProjectMenuEntry) {
        if (!menuEntry.authz) {
            return true;
        }

        return this.authzService.checkResourceActionsPermission(menuEntry.authz.resource, menuEntry.authz.actions);
    }

}