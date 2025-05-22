import { Component, Injectable, Type, inject } from '@angular/core';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { FormInstance } from '@codeffekt/ce-core-data';
import { CeFormEditorService } from '../../services/ce-form-editor.service';
import { Observable } from 'rxjs';
import { FormInfo } from '../../models/form-info';
import { CommonModule } from '@angular/common';
import { CeFormFactoryComponent, FormStoreService } from '../../forms';

@Injectable({ providedIn: 'root' })
export class FormActionToolbarService {

  constructor(
    private formActionService: FormActionService,
  ) { }

  getComponentTypeFromForm<T=any>(form: FormInstance): Type<T> {
    return this.formActionService.getToolbarFromForm(form);
  }
}

@Component({
    selector: 'ce-form-editor-toolbar',
    templateUrl: './form-editor-toolbar.component.html',
    styleUrls: ['./form-editor-toolbar.component.scss'],
    providers: [
        {
            provide: FormStoreService,
            useClass: FormActionToolbarService,
        }
    ],  
    imports: [
      CommonModule,
      CeFormFactoryComponent,
    ]
})
export class CeFormEditorToolbarComponent {
  currentForm$: Observable<FormInfo|undefined> = inject(CeFormEditorService).onFormInfo();  
}
