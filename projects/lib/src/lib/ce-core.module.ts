import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  CeAppConfig,
  CeCoreModuleConfig, CE_APP_CONFIG, CE_CORE_CONFIG
} from './ce-core.config';
import { FormActionDefault } from './forms/form/actions/form-action-default';

const DEFAULT_CE_CORE_CONFIG: CeCoreModuleConfig = {
  api_url: "http://localhost:3000",
};

const DEFAULT_CE_APP_CONFIG: CeAppConfig = {
  projectType: "*",
  version: "dev",
  title: "ce-core",
  projectTypes: [{
    projectType: "*",
    label: "default"
  }],
  params: {},
  assets: {}
};

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        {
            provide: CE_CORE_CONFIG, useValue: DEFAULT_CE_CORE_CONFIG
        },
        {
            provide: CE_APP_CONFIG, useValue: DEFAULT_CE_APP_CONFIG
        },
        {
            provide: FormActionDefault, useClass: FormActionDefault
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class CeCoreModule {

  static forRoot(
    config: CeCoreModuleConfig = DEFAULT_CE_CORE_CONFIG,
    appConfig: CeAppConfig = DEFAULT_CE_APP_CONFIG,
  ): ModuleWithProviders<CeCoreModule> {
    return {
      ngModule: CeCoreModule,
      providers: [
        {
          provide: CE_CORE_CONFIG,
          useValue: config
        },
        {
          provide: CE_APP_CONFIG,
          useValue: appConfig
        }
      ]
    };
  }
}
