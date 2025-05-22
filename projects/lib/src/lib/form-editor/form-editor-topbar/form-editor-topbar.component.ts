import { Component, Injectable, Type, inject } from '@angular/core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { CeFormEditorService } from '../../services/ce-form-editor.service';
import { Observable } from 'rxjs';
import { FormInfo } from '../../models/form-info';
import { CeFormFactoryComponent, FormStoreService } from '../../forms';
import { CommonModule } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class FormActionTopbarService {

  constructor(
    private formActionService: FormActionService,
  ) { }

  getComponentTypeFromForm<T=any>(form: FormInstance): Type<T> {
    return this.formActionService.getTopbarFromForm(form);
  }
}

@Component({
    selector: 'ce-form-editor-topbar',
    templateUrl: './form-editor-topbar.component.html',
    styleUrls: ['./form-editor-topbar.component.scss'],
    providers: [
        {
            provide: FormStoreService,
            useClass: FormActionTopbarService,
        }
    ],
    imports: [
      CommonModule,
      CeFormFactoryComponent,
    ]
})
export class CeFormEditorTopbarComponent {  
  currentForm$: Observable<FormInfo|undefined> = inject(CeFormEditorService).onFormInfo();  
}
