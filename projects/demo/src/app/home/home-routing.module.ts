import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard, CeFormEditorComponent, FormEditorResolverService } from '@codeffekt/ce-core';
// import { ExamplesMainComponent } from './examples-main/examples-main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'docs',
        pathMatch: 'full'
      },
      {
        path: 'docs',
        children: [
          {
            path: '',
            redirectTo: 'quickstart',
            pathMatch: 'full'
          },
          {
            path: 'quickstart',
            children: [
              {
                path: '',
                redirectTo: 'quickstart-introduction',
                pathMatch: 'full'
              },
              {
                path: ':form',
                resolve: {
                  form: FormEditorResolverService,
                },
                component: CeFormEditorComponent,
              },
            ]
          },
          {
            path: 'form',
            loadChildren: () => import('../forms/forms.module').then(m => m.FormsModule),
          },
          {
            path: 'tables',
            loadChildren: () => import('../tables/tables.module').then(m => m.TablesModule),
          },
          {
            path: 'lists',
            loadChildren: () => import('../lists/lists.module').then(m => m.ListsModule)
          },
          {
            path: 'navs',
            loadChildren: () => import('../navs/navs.module').then(m => m.NavsModule)
          },
          {
            path: 'graphs',
            loadChildren: () => import('../graphs/graphs.module').then(m => m.GraphsModule)
          },
          {
            path: 'breadcrumbs',
            loadChildren: () => import('../breadcrumbs/breadcrumbs.module').then(m => m.BreadcrumbsModule)
          },
          {
            path: 'blocks',
            loadChildren: () => import('../blocks/blocks.module').then(m => m.BlocksModule)
          },
        ]
      },
      /*      {
             path: 'projects',
             canActivate: [AuthGuard],
             loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule)
           }, 
           {
             path: 'assets',
             canActivate: [AuthGuard],
             loadChildren: () => import('../assets/assets.module').then(m => m.AssetsModule)
           },
           {
             path: 'apps',
             canActivate: [AuthGuard],
             loadChildren: () => import('../apps/apps.module').then(m => m.AppsModule)
           },    
           {
             path: 'myforms',
             canActivate: [AuthGuard],
             loadChildren: () => import('../my-forms/my-forms.module').then(m => m.MyFormsModule)
           } */
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
