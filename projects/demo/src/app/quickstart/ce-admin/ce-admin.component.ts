import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-ce-admin',
  templateUrl: './ce-admin.component.html',
  styleUrls: ['./ce-admin.component.scss']
})
export class CeAdminComponent implements OnInit {

  @Input() formWrapper: FormWrapper;
  @Output() formChanges = new EventEmitter<FormWrapper>();

  appModuleStr = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CeCoreModule } from '@codeffekt/ce-core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [    
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CeCoreModule,
    CeAdminModule,
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

  appStyleStr = `
$color-primary: #52857e;
$color-secondary: #f6b26b;
$navbar-color: $color-primary;
$side-menu-icon-color: white;
$side-menu-color: $color-primary !default; 


html,
body {
  height: 100vh;
}

@import "@codeffekt/ce-core/core";
@import "@codeffekt/ce-code-editor/core";
`;

  constructor() { }

  ngOnInit(): void {
  }

}
