import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CeAppGuard } from './app-guard';
import { AppsComponent } from './apps.component';
import { MainPageComponent } from '@codeffekt/ce-core';


const routes: Routes = [
  {
    path: '',    
    children: [
      {
        path: '',
        redirectTo: 'apps',
        pathMatch: 'full'
      },
      {
        path: 'apps',
        component: MainPageComponent,
        children: [
          {
            path: '',
            component: AppsComponent
          }
        ]        
      },
      {
        path: 'app/:appId',
        canActivate: [CeAppGuard],
        children: [
          {
            path: "",            
            loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
