import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavsExampleComponent } from './navs-example/navs-example.component';

const routes: Routes = [
  {
    path: '',
    component: NavsExampleComponent,
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavsRoutingModule { }
