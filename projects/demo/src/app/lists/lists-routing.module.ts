import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWrapperExampleComponent } from './list-wrapper-example/list-wrapper-example.component';

const routes: Routes = [
  {
    path: 'list-wrapper-example',
    component: ListWrapperExampleComponent
  },
  {
    path: '',
    redirectTo: 'list-wrapper-example',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
