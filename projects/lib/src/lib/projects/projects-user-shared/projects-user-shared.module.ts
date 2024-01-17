import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { CeFormQueryWrapperModule } from "../../formquery-wrapper";
import { ProjectsUserSharedComponent } from "./projects-user-shared.component";
import { CeListModule } from "../../list/list.module";
import { CeSectionModule } from "../../section/section.module";
import { CeFormsPipesModule } from "../../forms-pipes/forms-pipes.module";

@NgModule({
    declarations: [
        ProjectsUserSharedComponent
    ],
    imports: [
        CommonModule,
        CeFormQueryWrapperModule,
        CeFormsPipesModule,
        CeListModule,
        CeSectionModule,
    ],
    exports: [
        ProjectsUserSharedComponent,
    ]
})
export class CeProjectsUserSharedModule {
    
}