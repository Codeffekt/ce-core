import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CeFormDataService, CeLayoutModule, CeNavigationModule, CeSideMenuModule } from '@codeffekt/ce-core';
import { MockApiService } from '../api/mock-api.service';
import { AppConfigSelectComponent } from './app-config-select/app-config-select.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ExamplesMainComponent } from './examples-main/examples-main.component';
import { CeFormsPresentationComponent } from './ce-forms-presentation/ce-forms-presentation.component';

@NgModule({
  declarations: [
    HomeComponent,
    AppConfigSelectComponent,
    ExamplesMainComponent,
    CeFormsPresentationComponent,
  ],
  imports: [
    CommonModule,
    PortalModule,
    HomeRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    CeNavigationModule,
    CeSideMenuModule,
    CeLayoutModule
  ],
  providers: [
    {
      provide: CeFormDataService,
      useClass: MockApiService
    },
  ],
})
export class HomeModule { }
