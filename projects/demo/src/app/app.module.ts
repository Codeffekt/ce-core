import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CeAuthModule, CeCoreModule, CE_APP_CONFIG } from '@codeffekt/ce-core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CeAuthModule,
    MatSnackBarModule,
    CeCoreModule
  ],
  providers: [
    {
      provide: CE_APP_CONFIG,
      useValue: {              
        assets: {
          logoPath: 'assets/app_logo.png'
        }
      }
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          JSON: () => import('highlight.js/lib/languages/json'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          bash: () => import('highlight.js/lib/languages/bash'),
          html: () => import('highlight.js/lib/languages/xml'),
        },
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
