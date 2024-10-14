import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import { CeIllustrationComponent } from './illustration.component';

@NgModule({ exports: [
        CeIllustrationComponent
    ],
    declarations: [
        CeIllustrationComponent
    ], imports: [CommonModule,
        AngularSvgIconModule.forRoot()], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CeIllustrationModule { }
