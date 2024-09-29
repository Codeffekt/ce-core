import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPathService } from '../form/form-path.service';
import { CeFormModule, CeFormRouteResolver, CeGridModule, CeNavigationModule, FormInfo } from '@codeffekt/ce-core';
import { FormUrlQueryParamsDirective } from '../form/form-url-query-params-directive.component';
import { FormRouteResolver } from '../form/form-route-resolver.service';
import { CeListModule } from "../../../../lib/src/lib/list/list.module";
import { IndexType } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [
    CommonModule,
    CeNavigationModule,
    CeGridModule,
    CeFormModule,
    FormUrlQueryParamsDirective,
    CeListModule
  ],
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
  providers: [
    {
      provide: CeFormRouteResolver,
      useClass: FormRouteResolver,
    },
  ]
})
export class FormEditorComponent {

  private formService = inject(FormPathService);
  private formRouteResolver = inject(CeFormRouteResolver);
  currentForm$ = this.formService.onCurrentForm();
  currentForms$ = this.formService.onCurrentForms();

  onFormChanges(form: FormInfo, changes: any) {

  }

  onGoElt(formId: IndexType) {
    this.formRouteResolver.resolve(undefined, formId, undefined);
  }
}
