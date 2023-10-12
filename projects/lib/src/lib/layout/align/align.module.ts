import { NgModule } from '@angular/core';
import { CeAlignItemsDirective, CeAlignSelfContentDirective, CeJustifyContentDirective } from './align.directive';

@NgModule({
    imports: [
    ],
    exports: [
        CeAlignSelfContentDirective,
        CeAlignItemsDirective,
        CeJustifyContentDirective
    ],
    declarations: [
        CeAlignSelfContentDirective,
        CeAlignItemsDirective,
        CeJustifyContentDirective
    ],
    providers: [],
})
export class CeAlignModule { }
