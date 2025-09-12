import { Routes } from '@angular/router';
import { LoginComponent } from '@codeffekt/ce-core';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },  
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

