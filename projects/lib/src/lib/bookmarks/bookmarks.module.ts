import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";
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