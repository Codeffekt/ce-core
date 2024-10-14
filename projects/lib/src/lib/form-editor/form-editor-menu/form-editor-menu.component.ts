import { Component, Injectable, Type, inject } from '@angular/core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { FormActionRenderService } from '../../forms/form/actions/form-action-render.service';
import { CeFormEditorService } from '../../services/ce-form-editor.service';
import { BehaviorSubject } from 'rxjs';
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
  currentForm$: BehaviorSubject<FormInfo> = inject(CeFormEditorService).onFormInfo();  
}
