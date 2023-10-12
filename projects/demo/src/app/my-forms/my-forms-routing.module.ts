import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '@codeffekt/ce-core';
import { MyFormsComponent } from './my-forms/my-forms.component';

const routes: Routes = [{
  path: '',
  component: MainPageComponent,
  children: [
    {
      path: '',
      redirectTo: 'forms',
      pathMatch: 'full'
    },
    {
      path: 'forms',
      component: MyFormsComponent
    },
    {
      path: 'form/:form',
      data: { routeId: null },
      loadChildren: () => import('./form/form.module').then(m => m.FormModule)
    }    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFormsRoutingModule { }
