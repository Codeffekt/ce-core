import { NgModule } from '@angular/core';
import { CePaddingDirective, CeXPaddingDirective, CeYPaddingDirective } from './padding.directive';

@NgModule({
    imports: [],
    exports: [
        CePaddingDirective,
        CeYPaddingDirective,
        CeXPaddingDirective],
    declarations: [
        CePaddingDirective,
        CeYPaddingDirective,
        CeXPaddingDirective
    ],
    providers: [],
})
export class CePaddingModule { }
