import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { CeIconsModule } from '../icons';
import { CeSideMenuItemComponent } from './side-menu-item.component';
import {
  CeSideMenuComponent, CeSideMenuContentComponent,
  CeSideMenuFooterComponent, CeSideMenuHeaderComponent,
  CeSideMenuListComponent
} from './side-menu.component';
import { CeSideMenuDirective } from './side-menu.directive';

@NgModule({
  declarations: [
    CeSideMenuComponent,
    CeSideMenuContentComponent,
    CeSideMenuHeaderComponent,
    CeSideMenuFooterComponent,
    CeSideMenuListComponent,
    CeSideMenuItemComponent,
    CeSideMenuDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    CeIconsModule
  ],
  exports: [
    CeSideMenuComponent,
    CeSideMenuContentComponent,
    CeSideMenuHeaderComponent,
    CeSideMenuFooterComponent,
    CeSideMenuListComponent,
    CeSideMenuItemComponent,
    CeSideMenuDirective,
  ]
})
export class CeSideMenuModule { }
