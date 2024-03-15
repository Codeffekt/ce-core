import { Component, Injectable, Type, inject } from '@angular/core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { FormActionRenderService } from '../../forms/form/actions/form-action-render.service';
import { CeFormEditorService } from '../../services/ce-form-editor.service';

@Injectable({ providedIn: 'root' })
export class FormActionTopbarService {

  constructor(
    private formActionService: FormActionService,
  ) { }

  getRenderFromForm<T = any>(form: FormInstance): Type<T> {
    return this.formActionService.getTopbarFromForm(form);
  }
}

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
  currentForm$ = inject(CeFormEditorService).onFormInfo();  
}
