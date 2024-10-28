import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
        path: 'events',        
        loadComponent: () => import('../events/events.component').then(m => m.EventsComponent),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],    
})
export class MainRoutingModule { }