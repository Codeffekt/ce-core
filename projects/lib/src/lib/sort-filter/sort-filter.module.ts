import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { CeLayoutModule } from '../layout';
import { SortFilterDropdownComponent } from './sort-filter-dropdown/sort-filter-dropdown.component';
import { SortFilterComponent } from './sort-filter.component';

@NgModule({
    imports: [
        OverlayModule,
        MatIconModule,
        CeLayoutModule,
        MatButtonModule,
        CommonModule
    ],
    exports: [
        SortFilterComponent,
        SortFilterDropdownComponent
    ],
    declarations: [
        SortFilterComponent,
        SortFilterDropdownComponent
    ],
    providers: [],
})
export class CeSortFilterModule { }
