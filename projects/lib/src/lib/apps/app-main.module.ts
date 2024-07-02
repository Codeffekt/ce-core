import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CeMainPageModule } from "../main-page";
import { AppMainRoutingModule } from "./app-main-routing.module";
import { CeProjectAssocRenderModule } from "../projects/project-assoc/project-assoc-render-module";

@NgModule({
    imports: [
        CommonModule,
        CeMainPageModule,
        CeProjectAssocRenderModule,
        AppMainRoutingModule,
    ]
})
export class CeAppMainModule {

}