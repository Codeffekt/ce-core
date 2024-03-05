import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectMainRoutingModule } from './project-main-routing.module';
import { MainComponent } from './main/main.component';
import { CeProjectsListModule } from '../projects-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CeSideMenuModule } from '../../side-menu';
import { MatIconModule } from '@angular/material/icon';
import { PortalModule } from '@angular/cdk/portal';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { CeProjectMainComponentModule } from './project-main/project-main-component.module';
import { CeLayoutModule } from '../../layout';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    ProjectMainRoutingModule,
    CeProjectsListModule,
    CeProjectMainComponentModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    PortalModule,
    CeSideMenuModule,
    CeLayoutModule
  ]
})
export class CeProjectMainModule {
}
