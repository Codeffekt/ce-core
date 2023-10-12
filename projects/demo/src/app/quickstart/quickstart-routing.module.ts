import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IntroductionComponent } from "./introduction/introduction.component";
import { CeCoreComponent } from "./ce-core/ce-core.component";
import { CeCoreDataComponent } from "./ce-core-data/ce-core-data.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full'
    },
    {
        path: 'introduction',
        component: IntroductionComponent,
    },
    {
        path: 'ce-core',
        component: CeCoreComponent,
    },
    {
        path: 'ce-core-data',
        component: CeCoreDataComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuickstartRoutingModle { }