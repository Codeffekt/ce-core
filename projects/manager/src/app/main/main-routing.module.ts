import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormListService } from "../form-list/form-list.service";
import { formListResolver } from "../form-list/form-list-resolver.service";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'forms',
        pathMatch: 'full'
    },
    {
        path: 'forms',
        loadComponent: () => import('../forms/forms.component').then(m => m.FormsComponent),        
    },      
    {
        path: 'form',        
        loadChildren: () => import('../form/form.module').then(m => m.FormModule),        
    },
    {
        path: 'form-list/:id',
        providers: [
            FormListService
        ],
        resolve: {
            root: formListResolver,
        },
        loadComponent: () => import('../form-list/form-list.component').then(m => m.FormListComponent),
    },
    {
        path: 'events',        
        loadComponent: () => import('../events/events.component').then(m => m.EventsComponent),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],    
})
export class MainRoutingModule { }