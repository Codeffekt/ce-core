import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CeSideMenuModule } from "../../../side-menu";
import { CeProjectSelectorComponent } from "../project-selector/project-selector.component";
import { CeProjectMainComponent } from "./project-main.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    CeProjectMainComponent,
    CeProjectSelectorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    CeSideMenuModule,
  ],
  exports: [
    CeProjectMainComponent,
  ]
})
export class CeProjectMainComponentModule {
}