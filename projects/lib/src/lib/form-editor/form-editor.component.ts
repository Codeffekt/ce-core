import { Component, OnInit } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CeFormUpdaterService } from '../forms/form-updater.service';
import { ActivatedRoute } from '@angular/router';
import { FormWrapperChangeNotifier } from '../models/FormWrapperChangeNotifier';
import { CeFormEditorService, CeFormInfoBreadcrumbsService, CeFormsChangesService } from '../services';
import { FormInfo } from '../models/form-info';
@UntilDestroy()
@Component({
  selector: 'ce-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class CeFormEditorComponent implements OnInit {

  formInfos: FormInfo[] = [];
  parentFormInfo!: FormInfo;

  constructor(
    private route: ActivatedRoute,
    private formUpdaterService: CeFormUpdaterService,
    private formEditorService: CeFormEditorService,
    private formInfoBreadcrumbs: CeFormInfoBreadcrumbsService,
    private changesService: CeFormsChangesService,
  ) {
    this.listenToFormInfo();
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
      .forEach(elt => elt.formInfo.form = elt.update.wrapper.weakClone());
  }

  private updateFormInfo(formInfo: FormInfo) {
    this.parentFormInfo = formInfo;

    this.formInfos = [
      formInfo,
    ];
  }

  private async listenToFormInfo() {

    this.formEditorService.onFormInfo().pipe(
      untilDestroyed(this)
    ).subscribe(formInfo => this.updateFormInfo(formInfo));

  }

}
