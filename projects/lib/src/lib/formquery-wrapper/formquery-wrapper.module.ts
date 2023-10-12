import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CePaginatorModule } from "../paginator/paginator.module";
import { CeSearchboxModule } from "../searchbox/searchbox.module";
import { CeBookmarksModule } from "../bookmarks/bookmarks.module";
import { FormQueryWrapperComponent } from "./formquery-wrapper.component";
import { CeSortFilterModule } from "../sort-filter/sort-filter.module";
import { CeLayoutModule } from "../layout/layout.module";

@NgModule({
    declarations: [
        FormQueryWrapperComponent
    ],
    imports: [
        CommonModule,
        CeSearchboxModule,
        CeBookmarksModule,
        CePaginatorModule,
        CeSortFilterModule,
        CeLayoutModule
    ],
    exports: [
        FormQueryWrapperComponent
    ]
})
export class CeFormQueryWrapperModule { }