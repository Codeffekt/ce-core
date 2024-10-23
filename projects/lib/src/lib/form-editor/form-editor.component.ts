import { Component, OnInit, inject } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { CeFormUpdaterService } from '../forms/form-updater.service';
import { FormWrapperChangeNotifier } from '../models/FormWrapperChangeNotifier';
import { CeFormEditorService, CeFormInfoBreadcrumbsService, CeFormsChangesService } from '../services';
import { FormInfo } from '../models/form-info';
@Component({
  selector: 'ce-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class CeFormEditorComponent implements OnInit {

  currentForm$ = inject(CeFormEditorService).onFormInfo();
  formInfos: FormInfo[] = [];
  parentFormInfo!: FormInfo;

  constructor(
    private formUpdaterService: CeFormUpdaterService,
    private formInfoBreadcrumbs: CeFormInfoBreadcrumbsService,
    private changesService: CeFormsChangesService,
  ) {   
  }

  ngOnInit(): void {    
  }

  async onFormChanges(formInfo: FormInfo, wrapper: FormWrapper) {
    const updates = formInfo.block ?
      await this.formUpdaterService.updateSubForm(formInfo.form, this.parentFormInfo.form, formInfo.block) :
      await this.formUpdaterService.updateForm(formInfo.form);
    this.updateAllFormsInfoFromUpdaterRes(updates);
    this.changesService.changes.next(updates);
    this.formInfoBreadcrumbs.processFormChanges(updates);
    // this.bdService.onFormChanges(new FormMaskBuilder().build(formInfo.form.core, formInfo.formMask));
  }

  private updateAllFormsInfoFromUpdaterRes(updates: FormWrapperChangeNotifier[]) {
    updates.map(update => ({
      update,
      formInfo: this.formInfos.find(subForm => subForm.form.core.id === update.wrapper.core.id)
    }))
      .filter(elt => elt.formInfo !== undefined)
      .forEach(elt => elt.formInfo!.form = elt.update.wrapper.weakClone());
  } 
}
