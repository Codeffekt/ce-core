import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsExampleComponent } from './graphs-example/graphs-example.component';

const routes: Routes = [
  {
    path: '',
    component: GraphsExampleComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphsRoutingModule { }
