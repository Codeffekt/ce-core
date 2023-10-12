import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CeFormEditorComponent } from '@codeffekt/ce-core';
import { FormEditorResolverService } from './form-editor-resolver.service';


const routes: Routes = [
  {
    path: '',
    data: { routeId: 'field' },
    resolve: {
      form: FormEditorResolverService,
    },
    children: [
      {
        path: '',
        data: { routeId: null },
        component: CeFormEditorComponent,
      },
      {
        path: ':form',
        data: { routeId: null },
        loadChildren: () => import('../form/form.module').then(m => m.FormModule)
      },      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule { }
