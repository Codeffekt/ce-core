import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CeCoreModule } from '@codeffekt/ce-core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CeCoreModule.forRoot({
      api_url: environment.ce_api_config.api_url
    }, {
      projectType: 'trias',
      version: environment.ce_api_config.app_version,
      title: 'CeCore Demo',
      projectTypes: [{
        projectType: 'trias',
        label: 'default'
      }],
      params: {},
      assets: {},
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
