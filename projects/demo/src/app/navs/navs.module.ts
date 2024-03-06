import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavsExampleComponent } from './navs-example/navs-example.component';
import { CeLayoutModule, CeNavigationModule, NavigationItemStoreService } from '@codeffekt/ce-core';
import { TasksNavComponent } from './tasks-nav/tasks-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { NavsRoutingModule } from './navs-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AppSectionModule } from '../@shared/components/section/section.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    NavsExampleComponent,
    TasksNavComponent
  ],
  imports: [
    CommonModule,
    NavsRoutingModule,
    MatIconModule,
    MatButtonModule,
    CeNavigationModule,
    AppSectionModule,
    CeLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class NavsModule {
  constructor(
    navItemStore: NavigationItemStoreService,
  ) {

    navItemStore.setComponents({
      'tasks': { useClass: TasksNavComponent }
    });

  }
}
