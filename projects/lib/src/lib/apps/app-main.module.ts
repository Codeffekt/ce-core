import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CeMainPageModule } from "../main-page";
import { AppMainRoutingModule } from "./app-main-routing.module";

@NgModule({
    imports: [
        CommonModule,
        CeMainPageModule,
        AppMainRoutingModule,
    ]
})
export class CeAppMainModule {

}