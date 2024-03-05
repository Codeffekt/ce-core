import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { RouterModule } from "@angular/router";
import { CeSideMenuModule } from "../../../side-menu";
import { CeProjectSelectorComponent } from "../project-selector/project-selector.component";
import { CeProjectMainComponent } from "./project-main.component";

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