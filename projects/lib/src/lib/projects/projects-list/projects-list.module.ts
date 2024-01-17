import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { CeFormQueryWrapperModule } from "../../formquery-wrapper";
import { CeFormCardModule } from "../../forms";
import { CeListModule } from "../../list";
import { CeNavigationModule } from "../../navigation";
import { CePipesModule } from "../../pipes";
import { CeSideMenuModule } from "../../side-menu";
import { CeProjectsListComponent } from "./projects-list.component";
import { CeLayoutModule } from "../../layout/layout.module";
import { CeProjectsUserSharedModule } from "../projects-user-shared";
import { CeProjectsUserOwnedModule } from "../projects-user-owned";

@NgModule({
    declarations: [
        CeProjectsListComponent,
    ],
    imports: [
        CommonModule,
        CeSideMenuModule,
        CePipesModule,
        CeListModule,
        CeLayoutModule,
        CeNavigationModule,
        RouterModule,
        MatSidenavModule,
        CeFormCardModule,
        CeFormQueryWrapperModule,
        CeProjectsUserOwnedModule,
        CeProjectsUserSharedModule,
    ],
    exports: [
        CeProjectsListComponent
    ]
})
export class CeProjectsListModule {

}