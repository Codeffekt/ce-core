import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableWrapperExampleComponent } from './table-wrapper-example/table-wrapper-example.component';

const routes: Routes = [
  {
    path: 'table-wrapper-example',
    component: TableWrapperExampleComponent
  },
  {
    path: '',
    redirectTo: 'table-wrapper-example',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
