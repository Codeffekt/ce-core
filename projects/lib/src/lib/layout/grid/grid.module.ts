import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CeOverflowModule } from '../overflow';
import { CeGridComponent } from './grid.component';
import { GridColumnDirective, GridStartEndDirective } from './grid.directive';


@NgModule({
    imports: [
        CommonModule,
        CeOverflowModule
    ],
    exports: [
        CeGridComponent,
        GridStartEndDirective,
        GridColumnDirective
    ],
    declarations: [
        CeGridComponent,
        GridStartEndDirective,
        GridColumnDirective
    ],
    providers: [],
})
export class CeGridModule { }
