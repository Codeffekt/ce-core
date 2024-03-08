import { Component, Injectable, Type } from '@angular/core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { FormActionRenderService } from '../../forms/form/actions/form-action-render.service';
import { CeFormEditorService } from '../../services/ce-form-editor.service';
import { FormInfo } from '../../models';

@Injectable({ providedIn: 'root' })
export class FormActionMenuService {

  constructor(
    private formActionService: FormActionService,
  ) { }

  getRenderFromForm<T = any>(form: FormInstance): Type<T> {
    return this.formActionService.getMenuFromForm(form);
  }
}

@UntilDestroy()
@Component({
  selector: 'ce-form-editor-menu',
  templateUrl: './form-editor-menu.component.html',
  styleUrls: ['./form-editor-menu.component.scss'],
  providers: [
    {
      provide: FormActionRenderService,
      useClass: FormActionMenuService,
    }
  ]
})
export class CeFormEditorMenuComponent {

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
