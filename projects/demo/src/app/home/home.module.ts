import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
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
