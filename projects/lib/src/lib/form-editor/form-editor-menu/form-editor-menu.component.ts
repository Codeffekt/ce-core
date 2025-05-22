import { Component, Injectable, Type, inject } from '@angular/core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { FormActionService } from '../../forms/form/actions/form-action.service';
import { CeFormEditorService } from '../../services/ce-form-editor.service';
import { Observable } from 'rxjs';
import { FormInfo } from '../../models/form-info';
import { FormStoreService } from '../../forms/form/form-store.service';
import { CeFormFactoryComponent } from '../../forms/form/form-factory/form-factory.component';
import { CommonModule } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class FormActionMenuService {

  constructor(
    private formActionService: FormActionService,
  ) { }

  getComponentTypeFromForm<T=any>(form: FormInstance): Type<T> {
    return this.formActionService.getMenuFromForm(form);
  }

}

@Component({
  selector: 'ce-form-editor-menu',
  templateUrl: './form-editor-menu.component.html',
  styleUrls: ['./form-editor-menu.component.scss'],
  imports: [
    CommonModule,
    CeFormFactoryComponent,
  ],
  providers: [
    {
      provide: FormStoreService,
      useClass: FormActionMenuService,
    }
  ],
})
export class CeFormEditorMenuComponent {
  currentForm$: Observable<FormInfo | undefined> = inject(CeFormEditorService).onFormInfo();
}
