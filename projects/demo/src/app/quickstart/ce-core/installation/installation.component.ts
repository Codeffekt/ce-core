import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent {

  @Input() formWrapper: FormWrapper;
  @Output() formChanges = new EventEmitter<FormWrapper>();


  appModuleStr = `
import { NgModule } from '@angular/core';
import { CeCoreModule } from '@codeffekt/ce-core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [    
    CeCoreModule
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

  subModuleStr = `
  import { CommonModule } from "@angular/common";
  import { CeFormModule } from "@codeffekt/ce-core";

  @NgModule({
    imports: [
        CommonModule,        
        CeFormModule,      
    ],
    declarations: [
        TestComponent,
        CeCoreComponent
    ],
    providers: [
        
    ]
})
export class TestModule { }
`;

  testFormInstanceStr = `{
    "id": "unique-id",
    "ctime": 1697029148738,
    "title": "Exemple formulaire",
    "valid": true,
    "root": "unique-root",
    "content": {
      "checkItem1": {
        "field": "checkItem1",
        "label": "Première tâche",
        "type": "boolean",
        "value": false
      },
      "comment": {        
        "field": "comment",
        "type": "text",
        "label": "Commentaire",        
        "value": ""
      }    
    }
  }`;

  testForm = FormWrapper.fromForm(JSON.parse(this.testFormInstanceStr));

  componentSrcStr = `
  import { Component } from '@angular/core';
  import { FormWrapper } from '@codeffekt/ce-core-data';

  @Component({
    selector: 'test-component',
    templateUrl: './test-component.component.html',
    styleUrls: ['./test-component.component.scss']
  })
  export class TestComponent {

    testForm: FormWrapper.fromForm(${this.testFormInstanceStr});

  }
  `;

  componentTemplateStr = `
  <ce-form [formWrapper]="testForm"></ce-form>
  `;
}
