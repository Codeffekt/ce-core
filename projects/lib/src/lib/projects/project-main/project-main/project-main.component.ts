import { Component, OnInit } from '@angular/core';
import { FormInstance, FormProjectWrapper, FormUtils } from '@codeffekt/ce-core-data';
import { CeAppConfig } from '../../../ce-core.config';
import {
  CeAppService, CeBreadcrumbsService, CeFormEditorService, CeProjectParamsService,
  CeProjectsService
} from '../../../services';
import { FormInfo, isFormInfo } from '../../../models';
interface MenuEntry {
  field: string;
  routerLink: string[];
  icon: string;
  label: string;
}

@Component({
  selector: 'app-project-main',
  templateUrl: 'project-main.component.html',
})
export class CeProjectMainComponent implements OnInit {

  project!: FormProjectWrapper;

  appConfig!: CeAppConfig;

  menuEntries: MenuEntry[] = [];  

  constructor(
    private projectService: CeProjectsService,    
    paramsService: CeProjectParamsService,
    private breadcrumbService: CeBreadcrumbsService,  
    private formEditorService: CeFormEditorService,   
    appService: CeAppService,
  ) {
    this.project = projectService.getCurrentProject();
    this.appConfig = appService.getConfig();
    paramsService.setParamsFromProject(this.project);

    this.createMenuEntries();    
  }

  ngOnInit(): void {
  }

  onMenuItemClicked(item: MenuEntry) {
    const items = this.breadcrumbService.getLastItems();
    const existingItem = items.find(bcItem => bcItem.id === item.field);
    if(existingItem && isFormInfo(existingItem.data)) {
      const formInfo: FormInfo = existingItem.data;      
      this.breadcrumbService.setActiveItem(existingItem);
      this.formEditorService.setCurrentFormInfo(formInfo);
    }
  }

  private createMenuEntries() {
    this.menuEntries = this.applyProjectMaskOnMenuEntries();
  }

  private applyProjectMaskOnMenuEntries(): MenuEntry[] {

    const formProjectInstance =
      this.projectService.getCurrentProjectFormMasked()!.core as FormInstance;

    const assocsBlocks = FormUtils.getBlocks(formProjectInstance)
      .filter(block => block.type === "formArray");

    return assocsBlocks.map(assoc => ({
      field: assoc.field,
      routerLink: [assoc.field],
      icon: '',
      label: assoc.label
    })) as any;
  }  
}