import { Component, Injectable, Type } from '@angular/core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { FormActionRenderService } from '../../forms/form/actions/form-action-render.service';
import { CeFormEditorService } from '../../services/ce-form-editor.service';
import { FormInfo } from '../../models';

@Injectable({ providedIn: 'root' })
export class FormActionTopbarService {

  constructor(
    private formActionService: FormActionService,
  ) { }

  getRenderFromForm<T = any>(form: FormInstance): Type<T> {
    return this.formActionService.getTopbarFromForm(form);
  }
}

@UntilDestroy()
@Component({
  selector: 'ce-form-editor-topbar',
  templateUrl: './form-editor-topbar.component.html',
  styleUrls: ['./form-editor-topbar.component.scss'],
  providers: [
    {
      provide: FormActionRenderService,
      useClass: FormActionTopbarService,
    }
  ]
})
export class CeFormEditorTopbarComponent {
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
