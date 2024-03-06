import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { BookmarksComponent } from "./bookmarks.component";

@NgModule({
    declarations: [
        BookmarksComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatTabsModule,
    ],
    exports: [
        BookmarksComponent
    ]
})
export class CeBookmarksModule {}