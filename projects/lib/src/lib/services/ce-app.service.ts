import { Inject, Injectable } from '@angular/core';
import {
  DbArrayRes, FormBlock,
  FormInstance, FormInstanceMaskWrapper,
  FormProjectWrapper, FormQuery,
  FormWrapper, FORM_MASK_ROOT,
  haveProjectCreator} from '@codeffekt/ce-core-data';
import { CeCoreService } from './ce-core.service';
import { CeAppAssetsConfig, CeAppConfig, CE_APP_CONFIG } from '../ce-core.config';
import { CeAccountService } from './ce-account.service';
import { FormQueryBookmark } from '../forms/forms-query/form-instance-query.builder';
import { CeFormsParams } from '../models/ce-forms-params';
import { firstValueFrom } from 'rxjs';
import { CeFormsService } from './ce-forms.service';
import { CeFormsParamsService } from './ce-forms-params.service';

const ASSOCS_FOR_PARAMS_QUERY_LIMIT = 100;

/**
 * Services that manages Application context
 * - projects
 * - assets
 * - masks & styles
 * - params
 */
@Injectable({
  providedIn: 'root'
})
export class CeAppService {

  private queries: FormQueryBookmark[] = [];
  private masks: FormInstanceMaskWrapper[] = [];

  constructor(
    @Inject(CE_APP_CONFIG) private config: CeAppConfig,
    private readonly accountService: CeAccountService,
    private readonly coreService: CeCoreService,
    private readonly formsService: CeFormsService,
    private readonly paramsService: CeFormsParamsService,
  ) { }

  getProjectType() {
    return this.config.projectType;
  }  

  getAssets(): CeAppAssetsConfig {
    return this.config.assets || {};
  }

  getTitle() {
    return this.config.title;
  }

  getConfig() {
    return this.config;
  }

  setConfig(config: CeAppConfig) {
    this.config = config;
  }

  getParams(): CeFormsParams {
    return this.config.params || {};
  }

  getAppConfigType() {
    return this.config.configType || `app.config.${this.getProjectType()}`;
  }

  getQueries(page: string) {
    return this.queries.filter(q => q.page === page);
  }

  getMask(root: string): FormInstanceMaskWrapper {
    return this.masks.find(mask => mask.props.root === root) || FormInstanceMaskWrapper.emptyForRoot(root);
  }

  getMasks() {
    return this.masks;
  }

  loadConfigFromFormApp(app: FormWrapper) {
    this.config
  }

  async loadConfigFromProject(project: FormProjectWrapper) {
    this.clearConfig();

    /* if (haveProjectCreator(project, "queries-pages")) {
      await this.loadQueries(project);
    } */

    await this.loadAssocsForParams(project);

    await this.loadMasks(project);

  }

  private clearConfig() {
    this.queries = [];
    this.masks = [];
  }

  private async loadAssocsForParams(project: FormProjectWrapper) {
    const paramsBlocks = project.getFormsBlocks()
      .filter(block => block.params?.usedHasParams);
    for (const paramBlock of paramsBlocks) {
      await this.loadAssocForParams(project, paramBlock);
    }
  }

  private async loadAssocForParams(project: FormProjectWrapper, paramsBlock: FormBlock) {
    const res = await firstValueFrom(this.coreService.callFormsQuery(project.core.id, {
      limit: ASSOCS_FOR_PARAMS_QUERY_LIMIT,
      ref: paramsBlock.params.ref,
      queryFields: [
        {
          field: "root",
          op: "=",
          value: paramsBlock.root,
          onMeta: true
        }
      ]
    }));
    const formsProps = res.elts.map(form => FormWrapper.createProps(form));
    this.paramsService.mergeParams({
      [paramsBlock.field]: formsProps
    });
  }

  private async loadMasks(project: FormProjectWrapper) {

    if (haveProjectCreator(project.core, "masks")) {
      await this.loadMasksFromProject(project);
    }

    if (this.config.configType) {
      await this.loadMasksFromConfigType(this.config.configType);
    }

  }

  /* private async loadQueries(project: Project) {
    const res: DbArrayRes<FormInstance> = await this.coreService.callProject("getFormsQuery", project.id, "queries-pages", {}).toPromise();
    const variables: FormQueryVariables = {
      author: this.coreService.getCurrentUser().settings.id
    };
    this.queries = res.elts.map(form => FormInstanceQueryBuilder.createBookmark(form, variables));
  } */

  private async loadMasksFromConfigType(configType: string) {
    const res = await firstValueFrom(this.formsService.getRawFormsQuery(
      this.getFormMasksQueryWithConfigType(
        configType
      )
    ));
    this.masks = [...this.masks, ...this.createNewMasks(res.elts, this.masks)];
  }

  private async loadMasksFromProject(project: FormProjectWrapper) {
    const res = await this.getFormsFromTable(project, "masks");
    this.masks = [...this.masks, ...this.createNewMasks(res.elts, this.masks)];
  }

  /* private async loadMasksFromProjectStyles(project: Project) {
    const res = await this.getFormsFromTable(project, "styles");
    this.masks = [...this.masks, ...this.createNewMasks(res.elts, this.masks)];
  } */

  private createNewMasks(forms: FormInstance[], existingMasks: FormInstanceMaskWrapper[]) {
    return forms
      .filter(form => existingMasks
        .find(mask => mask.props.root === FormWrapper.getFormValue("root", form)) === undefined)
      .map(form => new FormInstanceMaskWrapper(form));
  }

  private getFormsFromTable(project: FormProjectWrapper, table: "masks" | "styles"): Promise<DbArrayRes<FormInstance>> {
    return firstValueFrom(this.coreService.callFormsQuery(project.core.id,
      {
        ...this.getFormQueryWithPossibleConfigType(this.config.configType),
        table
      }));
  }

  private getFormQueryWithPossibleConfigType(configType?: string): FormQuery {
    return configType ? {
      queryFields: [{
        field: "category",
        op: "=",
        value: configType
      }]
    } : {};
  }

  private getFormMasksQueryWithConfigType(configType: string): FormQuery {
    return {
      queryFields: [
        {
          field: "category",
          op: "=",
          value: configType
        },
        {
          field: "root",
          op: "=",
          value: FORM_MASK_ROOT,
          onMeta: true
        }
      ]
    };
  }
}
