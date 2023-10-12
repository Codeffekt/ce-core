import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CeEditTimeModule } from './edit-time';
import { CeFeatureBarModule } from './feature-bar';
import { CeIconModule } from './icon/icon.module';
import { CeNgReallyModule } from './ng-really';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    CeNgReallyModule,
    CeEditTimeModule,
    CeFeatureBarModule,
  ],
  exports: [
    CeIconModule,
    CeNgReallyModule,
    CeEditTimeModule,
    CeFeatureBarModule,
  ]
})
export class CeWidgetsModule { }
