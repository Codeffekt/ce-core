import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { CeLayoutModule } from '@codeffekt/ce-core';
import { SectionExampleComponent } from './section-example/section-example.component';

@NgModule({
  declarations: [
    SectionComponent,
    SectionExampleComponent
  ],
  imports: [
    CommonModule,
    CeLayoutModule
  ],
  exports: [
    SectionComponent,
    SectionExampleComponent
  ]
})
export class AppSectionModule { }
