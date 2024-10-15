import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeFormModule, CeFormRouteResolver, CeFormUpdaterService, CeGridModule, CeNavigationModule, FormInfo, SpaceFormPathService } from '@codeffekt/ce-core';
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

  private formService = inject(SpaceFormPathService);
  private formRouteResolver = inject(CeFormRouteResolver);
  private formUpdaterService = inject(CeFormUpdaterService);
  currentForm$ = this.formService.onCurrentForm();
  currentForms$ = this.formService.onCurrentForms();

  async onFormChanges(form: FormInfo, changes: any) {
    await this.formUpdaterService.updateForm(form.form);
  }

  onGoElt(formId: IndexType) {
    this.formRouteResolver.resolve(undefined, formId, undefined);
  }
}
