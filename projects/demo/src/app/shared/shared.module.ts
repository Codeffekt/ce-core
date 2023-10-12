import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { RouterModule } from '@angular/router';
import { CeSideMenuModule } from '@codeffekt/ce-core';

@NgModule({
  declarations: [
    HomeMenuComponent
  ],
  imports: [
    CommonModule,  
    RouterModule,
    CeSideMenuModule,
  ],
  exports: [
    HomeMenuComponent
  ]
})
export class SharedModule { }
