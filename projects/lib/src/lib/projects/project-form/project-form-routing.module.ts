import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CeFormEditorComponent } from '../../form-editor/form-editor.component';
import { FormEditorResolverService } from '../../resolvers/form-editor-resolver.service';

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
        loadChildren: () => import('./project-form.module').then(m => m.CeProjectFormModule)
      },      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CeProjectFormRoutingModule { }
