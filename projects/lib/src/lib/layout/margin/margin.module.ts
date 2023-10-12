import { NgModule } from '@angular/core';
import { 
    CeMarginBotttomDirective, CeMarginDirective, 
    CeMarginEndDirective, CeMarginStartDirective, 
    CeMarginTopDirective, CeXMarginDirective, 
    CeYMarginDirective } from './margin.directive';

@NgModule({
    imports: [],
    exports: [
        CeMarginDirective,
        CeYMarginDirective,
        CeXMarginDirective,
        CeMarginStartDirective,
        CeMarginEndDirective,
        CeMarginTopDirective,
        CeMarginBotttomDirective],
    declarations: [
        CeMarginDirective,
        CeYMarginDirective,
        CeXMarginDirective,
        CeMarginStartDirective,
        CeMarginEndDirective,
        CeMarginTopDirective,
        CeMarginBotttomDirective
    ],
    providers: [],
})
export class CeMarginModule { }
