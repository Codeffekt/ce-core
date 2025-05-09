import { Component, Injectable, Type, inject } from '@angular/core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { FormActionRenderService } from '../../forms/form/actions/form-action-render.service';
import { CeFormEditorService } from '../../services/ce-form-editor.service';
import { Observable } from 'rxjs';
import { FormInfo } from '../../models/form-info';

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
    ],
    standalone: false
})
export class CeFormEditorMenuComponent {
  currentForm$: Observable<FormInfo|undefined> = inject(CeFormEditorService).onFormInfo();  
}
