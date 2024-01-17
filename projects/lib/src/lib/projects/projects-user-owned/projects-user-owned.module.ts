import { NgModule } from "@angular/core";
import { ProjectsUserOwnedComponent } from "./projects-user-owned.component";
import { CommonModule } from "@angular/common";
import { CeFormQueryWrapperModule } from "../../formquery-wrapper";
import { CeListModule } from "../../list/list.module";
import { CeSectionModule } from "../../section/section.module";

@NgModule({
    declarations: [
        ProjectsUserOwnedComponent
    ],
    imports: [
        CommonModule,
        CeFormQueryWrapperModule,
        CeListModule,
        CeSectionModule,
    ],
    exports: [
        ProjectsUserOwnedComponent,
    ]
})
export class CeProjectsUserOwnedModule {

}