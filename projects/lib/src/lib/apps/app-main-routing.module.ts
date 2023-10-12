import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "../main-page/main-page/main-page.component";

const routes: Routes = [
    {
        path: '', component: MainPageComponent,        
        loadChildren: () => import("../projects/project-main").then(m => m.CeProjectMainModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AppMainRoutingModule { }