import { Component, Injectable, Type, inject } from '@angular/core';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { FormInstance } from '@codeffekt/ce-core-data';
import { FormActionRenderService } from '../../forms/form/actions/form-action-render.service';
import { CeFormEditorService } from '../../services/ce-form-editor.service';
import { BehaviorSubject } from 'rxjs';
import { FormInfo } from '../../models/form-info';

@Injectable({ providedIn: 'root' })
export class FormActionToolbarService {

  constructor(
    private formActionService: FormActionService,
  ) { }

  getRenderFromForm<T = any>(form: FormInstance): Type<T> {
    return this.formActionService.getToolbarFromForm(form);
  }
}

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
  currentForm$: BehaviorSubject<FormInfo> = inject(CeFormEditorService).onFormInfo();  
}
