import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { CePipesModule } from "../pipes/pipes.module";
import { CeNgReallyModule } from "../widgets";
import { MediaPhotoComponent } from "./media-photo.component";

@NgModule({
    declarations: [
        MediaPhotoComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        CePipesModule,
        CeNgReallyModule,
    ],
    exports: [
        MediaPhotoComponent,
    ]
})
export class CeMediaPhotoModule {}