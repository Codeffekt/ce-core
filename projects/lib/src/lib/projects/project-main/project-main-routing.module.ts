import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth';
import { MembersResolverService, ProjectConfigResolverService } from '../../resolvers';
import { CeProjectsListComponent } from '../projects-list';
import { MainComponent } from './main/main.component';
import { CeProjectMainComponent } from './project-main/project-main.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      redirectTo: 'projects',
      pathMatch: 'full'
    },
    {
      path: 'projects',
      component: CeProjectsListComponent,
    },
    {
      path: 'project/:project',
      data: { isRoot: true },
      component: CeProjectMainComponent,
      resolve: {
        project: ProjectConfigResolverService,
        members: MembersResolverService,
      },
      children: [
        {
          path: ':assoc',
          data: {
            routeId: 'assoc',
            useParams: true,
          },
          loadChildren: () => import("../project-assoc/project-assoc.module").then(m => m.CeProjectAssocModule)
        },
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectMainRoutingModule { }
