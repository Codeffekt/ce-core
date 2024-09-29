import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LogoutComponent } from '@codeffekt/ce-core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  
  {
    path: 'login',
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
