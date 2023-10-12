import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CeAppConfig, CeAppRunnerService, CeAppService, CeFormEditorService, CeFormsService, CeProjectsService } from '@codeffekt/ce-core';
import { FormInstance, FormWrapper, IndexType } from '@codeffekt/ce-core-data';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-config-select',
  templateUrl: './app-config-select.component.html',
  styleUrls: ['./app-config-select.component.scss']
})
export class AppConfigSelectComponent implements OnInit {

  @Output() onConfigTypeChanged = new EventEmitter<string>();

  configId!: IndexType;  

  appConfigs: FormWrapper[] = [];

  constructor(
    private appService: CeAppService,
    private appRunnerService: CeAppRunnerService,
    private projectService: CeProjectsService,
    private formEditorService: CeFormEditorService,
    private formsService: CeFormsService,
  ) {    
  }

  ngOnInit(): void {    
  }

  async changeConfigType() {        

    await this.appRunnerService.fetchCurrentApp(this.configId);    

    const currentProject = this.projectService.getCurrentProject();
    if (currentProject) {
      await this.appService.loadConfigFromProject(currentProject);
      const currentFormInfo = this.formEditorService.getCurrentFormInfo();
      if (currentFormInfo?.form) {
        const core = currentFormInfo.form.core as FormInstance;
        this.formEditorService.setCurrentFormInfo({
          ...currentFormInfo,
          formMask: this.appService.getMask(core.root),
        })
      }
    }

    this.onConfigTypeChanged.emit(this.configId);
  }

  async loadAppsFromForms() {
    const res = await firstValueFrom(this.formsService.getRawFormsQuery({
      queryFields: [
        {
          field: 'root',
          op: "=",
          value: 'forms-app',
          onMeta: true
        }
      ]
    }));
    this.appConfigs = res.elts.map(elt => FormWrapper.fromForm(elt));

    this.configId = this.appConfigs.length ? this.appConfigs[0].core.id : undefined;

    if(this.configId) {
      this.changeConfigType();
    }
  }
}
