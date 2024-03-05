import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CeLayoutModule } from '../layout';
import { CePipesModule } from '../pipes/pipes.module';
import { CeNavigationAccountModule } from './navigation-account';
import { NavigationActionsComponent } from './navigation-actions/navigation-actions.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CeNavigationBarDirective } from './navigation-bar/navigation-bar.directive';
import { NavigationBreadcrumbItemsComponent } from './navigation-breadcrumb-items/navigation-breadcrumb-items.component';
import { NavigationItemDefaultComponent } from './navigation-item-default/navigation-item-default.component';
import { NavigationItemFactoryComponent } from './navigation-item-factory/navigation-item-factory.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationLayoutStickyDirective } from './navigation-layout/navigation-layout-sticky.directive';
import { NavigationLayoutComponent } from './navigation-layout/navigation-layout.component';
import { NavigationBarContentComponent } from './navigation-bar-content/navigation-bar-content.component';
import { NavigationBreadcrumbItemComponent } from './navigation-breadcrumb-item/navigation-breadcrumb-item.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationItemComponent,
    NavigationLayoutComponent,
    CeNavigationBarDirective,
    NavigationItemDefaultComponent,
    NavigationItemFactoryComponent,
    NavigationLayoutStickyDirective,
    NavigationBreadcrumbItemsComponent,
    NavigationActionsComponent,
    NavigationBarContentComponent,
    NavigationBreadcrumbItemComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CePipesModule,
    OverlayModule,
    CeLayoutModule,
    CeNavigationAccountModule
  ],
  exports: [
    NavigationBarComponent,
    NavigationItemComponent,
    NavigationLayoutComponent,
    NavigationItemFactoryComponent,
    CeNavigationBarDirective,
    NavigationBreadcrumbItemsComponent,
    NavigationActionsComponent,
    NavigationBarContentComponent,
  ]
})
export class CeNavigationModule { }
