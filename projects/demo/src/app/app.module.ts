import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CeCoreModule, CE_APP_CONFIG, CeFormsService, FormsLocalService } from '@codeffekt/ce-core';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({  
  imports: [
    CommonModule,
    RouterModule,    
    BrowserModule,
    BrowserAnimationsModule,    
    MatSnackBarModule,    
    CeCoreModule,
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
    {
      provide: CeFormsService,
      useClass: FormsLocalService,
    },   
  ],  
})
export class AppModule { }
