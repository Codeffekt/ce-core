import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaAccountComponent } from '@codeffekt/ce-core';

const routes: Routes = [{ path: '', component: MediaAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
