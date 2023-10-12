import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import { CeIllustrationComponent } from './illustration.component';

@NgModule({
    imports: [
        CommonModule,
        AngularSvgIconModule.forRoot(),
        HttpClientModule,
    ],
    exports: [
        CeIllustrationComponent
    ],
    declarations: [
        CeIllustrationComponent
    ],
    providers: [],
})
export class CeIllustrationModule { }
