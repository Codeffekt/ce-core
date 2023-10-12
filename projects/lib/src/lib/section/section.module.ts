import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeSectionComponent } from './section.component';
import { CeSectionTitleComponent } from './section-title/section-title.component';
import { CeSectionActionsComponent } from './section-actions/section-actions.component';
import { CeLayoutModule } from '../layout';
import { CeSectionContentComponent } from './section-content/section-content.component';

@NgModule({
  declarations: [
    CeSectionComponent,
    CeSectionTitleComponent,
    CeSectionActionsComponent,
    CeSectionContentComponent
  ],
  imports: [
    CommonModule,
    CeLayoutModule
  ],
  exports: [
    CeSectionComponent,
    CeSectionTitleComponent,
    CeSectionActionsComponent,
    CeSectionContentComponent
  ]
})
export class CeSectionModule { }
