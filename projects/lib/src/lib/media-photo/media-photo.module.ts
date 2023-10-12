import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
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