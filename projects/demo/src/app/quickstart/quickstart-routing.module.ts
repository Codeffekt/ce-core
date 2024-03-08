/* import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CeFormEditorComponent, FormEditorResolverService  } from "@codeffekt/ce-core";

const routes: Routes = [
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuickstartRoutingModle { } */