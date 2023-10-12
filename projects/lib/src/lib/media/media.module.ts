import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from "@angular/material/stepper";
import { NgxUploaderModule } from "ngx-uploader";
import { CeIllustrationModule } from "../illustration/illustration.module";
import { CeMediaPhotoModule } from "../media-photo/media-photo.module";
import { CeNavigationModule } from "../navigation/navigation.module";
import { CePaginatorModule } from "../paginator/paginator.module";
import { CePipesModule } from "../pipes/pipes.module";
import { AssetImportComponent } from "./asset-import/asset-import.component";
import { MediaAccountComponent } from "./media-account/media-account.component";
import { MediaListComponent } from "./media-list/media-list.component";
import { MediaProjectComponent } from "./media-project/media-project.component";

@NgModule({
    declarations: [
        MediaProjectComponent,
        MediaAccountComponent,
        MediaListComponent,
        AssetImportComponent
    ],    
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatStepperModule,
        MatProgressBarModule,
        FormsModule,
        ReactiveFormsModule,
        NgxUploaderModule,        
        CePipesModule,
        CeMediaPhotoModule,        
        CeIllustrationModule,
        CeNavigationModule,
        CePaginatorModule,
    ],
    exports: [
        MediaListComponent,
        MediaProjectComponent,
        MediaAccountComponent,
        AssetImportComponent,        
    ],
})
export class CeMediaModule { }