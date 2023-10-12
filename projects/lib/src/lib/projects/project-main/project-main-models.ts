import { InjectionToken } from "@angular/core";
import { Route } from "@angular/router";
import { AccountAppActions } from "@codeffekt/ce-core-data";

export const CE_PROJECT_MAIN_CONFIG = new InjectionToken<CeProjectMainModuleConfig>('ce.project.config');

export interface CeProjectMenuEntry {
    label?: string;
    icon?: string;
    route: Route;
    fontIcon?: string;
    disabled?: boolean;
    authz?: { resource: string, actions: AccountAppActions[] };
    keepDefaultRoute?: boolean;
}

export interface CeActiveProjectMenuEntry {
    label: string;
    icon: string;
    fontIcon: string;
    route: Route;
}

export interface CeProjectMainModuleConfig {
    menuEntries: CeProjectMenuEntry[];
    defaultRoutePath?: string;
}