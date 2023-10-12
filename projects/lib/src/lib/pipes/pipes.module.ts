import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
    AssetEltThumbnailPipe, AssetOriginalSizeImage,
    AssetThumbnailPipe, AssetThumbnailWithIdPipe
} from "./asset.pipe";
import { CalendarDatePipe } from "./date.pipe";
import { FileSizePipe } from "./filesize.pipe";
import { CeCoreAccountPipesModule } from "../account";

@NgModule({
    declarations: [
        CalendarDatePipe,
        AssetThumbnailPipe,
        AssetEltThumbnailPipe,
        AssetThumbnailWithIdPipe,
        AssetOriginalSizeImage,
        FileSizePipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CalendarDatePipe,
        AssetThumbnailPipe,
        AssetEltThumbnailPipe,
        AssetThumbnailWithIdPipe,
        AssetOriginalSizeImage,
        FileSizePipe,
        CeCoreAccountPipesModule
    ]
})
export class CePipesModule { }