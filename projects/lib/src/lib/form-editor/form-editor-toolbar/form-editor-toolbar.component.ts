import { Component, Injectable, Type } from '@angular/core';
import { FormActionService } from '../../forms';
import { FormInstance } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormActionRenderService } from '../../forms/form/actions/form-action-render.service';
import { FormInfo } from '../../models/form-info';
import { CeFormEditorService } from '../../services/ce-form-editor.service';

@Injectable({ providedIn: 'root' })
export class FormActionToolbarService {

  constructor(
    private formActionService: FormActionService,
  ) { }

  getRenderFromForm<T = any>(form: FormInstance): Type<T> {
    return this.formActionService.getToolbarFromForm(form);
  }
}

@UntilDestroy()
@Component({
  selector: 'ce-form-editor-toolbar',
  templateUrl: './form-editor-toolbar.component.html',
  styleUrls: ['./form-editor-toolbar.component.scss'],
  providers: [
    {
      provide: FormActionRenderService,
      useClass: FormActionToolbarService,
    }
  ]
})
export class CeFormEditorToolbarComponent {
  formInfos: FormInfo[] = [];
  parentFormInfo!: FormInfo;

  constructor(
    private formEditorService: CeFormEditorService,
  ) {
    this.listenToFormInfo();
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
