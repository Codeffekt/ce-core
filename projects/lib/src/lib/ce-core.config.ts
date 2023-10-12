import { InjectionToken } from "@angular/core";
import { ProjectType, ProjectTypeLabel } from "@codeffekt/ce-core-data";
import { CeFormsParams } from "./models/ce-forms-params";

export const CE_CORE_CONFIG = new InjectionToken<CeCoreModuleConfig>('ce.core.config');

export interface CeCoreModuleConfig {
    api_url: string;
}

export const CE_APP_CONFIG = new InjectionToken<CeAppConfig>('ce.app.config');

export interface CeAppAssetsConfig {
    logoPath?: string;
    loginImagePath?: string;
}

export interface CeAppConfig {
    projectType: ProjectType;
    projectTypes: ProjectTypeLabel[];
    version: string;
    title: string;
    params?: CeFormsParams;
    assets?: CeAppAssetsConfig;
    configType?: string;
    defaultAssocIdRoute?: string;    
}