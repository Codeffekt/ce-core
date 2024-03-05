import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CeSideMenuModule } from '../side-menu';
import { CeLayoutModule } from '../layout';
import { CeNavigationModule } from '../navigation';
import { RouterModule } from '@angular/router';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    CeSideMenuModule,
    CeLayoutModule,
    CeNavigationModule,
    RouterModule,
  ],
  exports: [
    MainPageComponent
  ]
})
export class CeMainPageModule { }
