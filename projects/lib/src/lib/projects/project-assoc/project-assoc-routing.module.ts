import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CeProjectAssocResolver } from './project-assoc.resolver';
import { CeFormEditorComponent } from '../../form-editor/form-editor.component';

const routes: Routes = [
  {
    path: '',
    data: { routeId: null },
    resolve: {
      block: CeProjectAssocResolver
    },
    children: [
      {
        path: '',
        component: CeFormEditorComponent
      },
      {
        path: ':form',
        data: { routeId: null },
        loadChildren: () => import('../project-form/project-form.module').then(m => m.CeProjectFormModule)
      }
    ],    
  },
  /* {
    path: ':form',
    data: { routeId: null },
    loadChildren: () => import('../project-form/project-form.module').then(m => m.CeProjectFormModule)
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CeProjectAssocRoutingModule { }
